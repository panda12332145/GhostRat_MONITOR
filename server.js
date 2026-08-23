import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));
app.use(express.json());

// Mock data - simulating alerts from a database/monitoring system
let alerts = [
  {
    id: 'ALT-001',
    title: 'NODE_DISCONNECTED',
    severity: 'warning',
    color: '#FF6B35',
    message: 'Target US-Desktop lost connection. Probable firewall update.',
    timestamp: Date.now() - 60000, // 1 minute ago
    isRead: false,
  },
  {
    id: 'ALT-002',
    title: 'NEW_INFILTRATION',
    severity: 'success',
    color: '#00FFD4',
    message: 'Payload successfully deployed to node US-HOST-05.',
    timestamp: Date.now() - 180000, // 3 minutes ago
    isRead: false,
  },
  {
    id: 'ALT-003',
    title: 'UPDATE_AVAIL',
    severity: 'critical',
    color: '#FF0040',
    message: 'Nexus Client v3.5 is now available for deployment.',
    timestamp: Date.now() - 300000, // 5 minutes ago
    isRead: false,
  },
];

// Keep track of dismissed alerts temporarily (5 second window)
const dismissedAlerts = new Set();

// GET /api/alerts - Fetch all active alerts
app.get('/api/alerts', (req, res) => {
  const activeAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));
  res.json({
    success: true,
    data: activeAlerts,
    count: activeAlerts.length,
    timestamp: Date.now(),
  });
});

// POST /api/alerts/:id/dismiss - Mark alert as dismissed (temporary)
app.post('/api/alerts/:id/dismiss', (req, res) => {
  const { id } = req.params;
  const alert = alerts.find(a => a.id === id);

  if (!alert) {
    return res.status(404).json({
      success: false,
      error: 'Alert not found',
    });
  }

  // Mark as dismissed
  dismissedAlerts.add(id);

  // Auto-remove from dismissedAlerts after 5 seconds (for persistence sync)
  setTimeout(() => {
    dismissedAlerts.delete(id);
    // In a real system, you'd also remove from database here
    alerts = alerts.filter(a => a.id !== id);
  }, 5000);

  res.json({
    success: true,
    message: `Alert ${id} marked for dismissal`,
    willRemoveIn: 5000,
  });
});

// POST /api/alerts/refresh - Force refresh (simulates new alerts arriving)
app.post('/api/alerts/refresh', (req, res) => {
  // In a real system, this would query the database for new alerts
  // For now, we'll just return the current active ones
  const activeAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));
  
  res.json({
    success: true,
    data: activeAlerts,
    count: activeAlerts.count,
    timestamp: Date.now(),
    message: 'Alerts refreshed',
  });
});

// POST /api/alerts/clear-all - Clear all alerts
app.post('/api/alerts/clear-all', (req, res) => {
  const count = alerts.length - dismissedAlerts.size;
  alerts = [];
  dismissedAlerts.clear();

  res.json({
    success: true,
    message: `Cleared ${count} alerts`,
    timestamp: Date.now(),
  });
});

// POST /api/alerts/add - Add a new alert (for testing)
app.post('/api/alerts/add', (req, res) => {
  const { title, color, message, severity } = req.body;

  if (!title || !color || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: title, color, message',
    });
  }

  const newAlert = {
    id: `ALT-${Date.now()}`,
    title,
    color,
    message,
    severity: severity || 'info',
    timestamp: Date.now(),
    isRead: false,
  };

  alerts.push(newAlert);

  res.json({
    success: true,
    data: newAlert,
    message: 'Alert added successfully',
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: Date.now() });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  GhostRat Alert Server Running         ║
║  http://localhost:${PORT}                ║
║                                        ║
║  Endpoints:                            ║
║  GET    /api/alerts                   ║
║  POST   /api/alerts/:id/dismiss       ║
║  POST   /api/alerts/refresh           ║
║  POST   /api/alerts/clear-all         ║
║  POST   /api/alerts/add               ║
║  GET    /api/health                   ║
╚════════════════════════════════════════╝
  `);
});
