const express = require('express');
const QRCode = require('qrcode');
const archiver = require('archiver');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 7106; // Changed to match the API URL
const JWT_SECRET = 'your-secret-key-change-in-production'; // In production, use environment variable

// In-memory user store (replace with database in production)
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    passwordHash: '$2a$12$BN6d6CvDwM.1xvJlU3TXsuXcuhQ7/W/wyXxoYATS4ghxnULtgNIjS' // 'password' hashed with bcrypt workFactor 12
  }
];

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Sanitize filename function
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9\-_\.]/g, '_');
}

// Generate timestamp
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

// Extract path from URL
function extractPath(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.substring(1); // Remove leading slash
  } catch (error) {
    return sanitizeFilename(url.replace(/https?:\/\//, '').replace(/\//g, '_'));
  }
}

// Endpoint to download QR codes as ZIP
app.post('/api/download-qr-zip', async (req, res) => {
  try {
    const { qrCodes } = req.body; // Array of { shortUrl, destinastionUrl }

    if (!qrCodes || !Array.isArray(qrCodes)) {
      return res.status(400).json({ error: 'Invalid request: qrCodes array required' });
    }

    const timestamp = getTimestamp();
    const folderName = `qr-codes-${timestamp}`;
    const zipFileName = `${folderName}.zip`;

    // Set response headers for ZIP download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);

    // Create archiver instance
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    // Pipe archive to response
    archive.pipe(res);

    // Handle archive errors
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      res.status(500).json({ error: 'Failed to create ZIP file' });
    });

    // Process each QR code
    for (const [index, qrData] of qrCodes.entries()) {
      const { shortUrl, destinastionUrl } = qrData;

      if (!shortUrl) continue;

      // Extract filename from short URL
      const pathPart = extractPath(shortUrl);
      const sanitizedPath = sanitizeFilename(pathPart || `qr_${index + 1}`);
      const qrFileName = `${sanitizedPath}.png`;
      const txtFileName = `${sanitizedPath}.txt`;

      try {
        // Generate QR code as buffer
        const qrBuffer = await QRCode.toBuffer(shortUrl, {
          type: 'png',
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });

        // Add QR image to archive
        archive.append(qrBuffer, { name: `${folderName}/${qrFileName}` });

        // Create and add text file with URLs
        const txtContent = `Short URL: ${shortUrl}\nDestination URL: ${destinastionUrl || 'N/A'}\n`;
        archive.append(txtContent, { name: `${folderName}/${txtFileName}` });

      } catch (qrError) {
        console.error(`Error generating QR for ${shortUrl}:`, qrError);
        // Continue with next QR code
      }
    }

    // Finalize the archive
    await archive.finalize();

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/Users/Loginverify', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email (simulating Cosmos DB lookup)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return LoginResponse as per specification
    res.json({
      message: 'Login successful',
      redirectUrl: '/dashboard',
      userId: user.id
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
