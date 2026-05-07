import App from './pages/App';
import { MySwalProvider } from './context/MySwalContext';
import { cleanupExpiredCache } from './hooks/useLocalCache';

// 应用启动时清理过期缓存
cleanupExpiredCache();

export default function Root() {
  return (
    <MySwalProvider>
      <App />
    </MySwalProvider>
  );
}
