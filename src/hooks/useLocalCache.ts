import { useState, useEffect } from 'preact/compat';
import { MySwal } from '../context/MySwalContext';

interface CacheItem {
  data: any;
  timestamp: number;
}

const API_URL = 'https://tdx.transportdata.tw/api/basic/v2/Rail/THSR';
const CACHE_KEY = 'app-cache';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * 获取本地缓存数据
 */
function getCachedData(key: string): any | null {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const item = cache[key] as CacheItem | undefined;

    if (!item?.timestamp) return null;

    const now = Date.now();
    const age = now - item.timestamp;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayStartMs = todayStart.getTime();

    // 检查：在一周内 AND 不是今天之前的数据
    const isWithinWeek = age <= ONE_WEEK_MS;
    const isNotBeforeToday = item.timestamp >= todayStartMs;

    if (isWithinWeek && isNotBeforeToday) {
      return item.data;
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }

  return null;
}

/**
 * 存储数据到本地缓存
 */
function setCachedData(key: string, data: any): void {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[key] = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

/**
 * 清理过期缓存（应用启动时调用）
 */
export function cleanupExpiredCache(): void {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const now = Date.now();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayStartMs = todayStart.getTime();

    let hasChanges = false;

    Object.keys(cache).forEach((key) => {
      const item = cache[key] as CacheItem;
      if (item?.timestamp) {
        const age = now - item.timestamp;
        const isExpired = age > ONE_WEEK_MS || item.timestamp < todayStartMs;

        if (isExpired) {
          delete cache[key];
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch (error) {
    console.error('Error cleaning up cache:', error);
  }
}

interface UseLocalCacheResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * 自定义 Hook：使用本地缓存的数据获取
 * 优先使用缓存（如果有效），缓存不存在或过期才调用 API
 */
export function useLocalCache<T = any>(
  endpoint: string | null,
  fetcher?: (url: string) => Promise<any>,
): UseLocalCacheResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!endpoint) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // 第一步：检查缓存
    const cachedData = getCachedData(endpoint);
    if (cachedData) {
      setData(cachedData);
      setIsLoading(false);
      return;
    }

    // 第二步：缓存不存在，调用 API
    const fetchData = async () => {
      try {
        const url = `${API_URL}${endpoint}`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          const apiError: any = new Error('An error occurred while fetching the data.');
          apiError.info = errorData;
          apiError.status = response.status;
          throw apiError;
        }

        const result = await response.json();
        setData(result);
        setCachedData(endpoint, result);
      } catch (err) {
        const fetchError = err instanceof Error ? err : new Error(String(err));
        setError(fetchError);

        // 显示错误提示框
        try {
          MySwal.fire({
            icon: 'info',
            title: (fetchError as any).info?.Message || '抱歉，伺服器維修中',
            showConfirmButton: false,
            showCloseButton: true,
          });
        } catch (alertError) {
          console.error('Error showing alert:', alertError);
        }

        console.error('Fetch error:', fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
}

export default useLocalCache;
