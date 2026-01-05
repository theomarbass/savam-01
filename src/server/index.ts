import app from '@/app';
import { config } from '@/config/env';
import setupGracefulShutdown from './gracefulShutdown';

const PORT = config.server.port;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 ========================================');
  console.log(`🖥️  Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Entorno: ${config.server.nodeEnv}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log('🚀 ========================================');
});

// Configurar cierre graceful del servidor
setupGracefulShutdown(server);