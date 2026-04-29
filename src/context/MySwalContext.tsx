import { ComponentChildren } from 'preact';
import { createPortal, createContext, useContext, useMemo, useRef, useState, useEffect, useCallback } from 'preact/compat';

interface SwalConfig {
  icon?: string;
  title?: string;
  showConfirmButton?: boolean;
  showCloseButton?: boolean;
  type?: string;
  timer?: number;
}

const SwalContext = createContext<{ fire: (config: SwalConfig) => void; close: () => void } | null>(
  null,
);

// 建立一個外部可以存取的「指令式」介面
export const MySwal = {
  fire: (config: SwalConfig) => {
    console.warn('MySwalProvider is not initialized');
  }
};

export function MySwalProvider({ children }: { children: ComponentChildren }) {
  const [config, setConfig] = useState<SwalConfig | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 當 config 改變時，控制 dialog 的開啟
  useEffect(() => {
    if (config && dialogRef.current) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal();
      }
    }
  }, [config]);

  const fire = (newConfig: SwalConfig) => {
    // 模擬 SweetAlert2 的參數合併與預設值
    setConfig({
      icon: 'info',
      title: '',
      showConfirmButton: true,
      showCloseButton: true,
      ...newConfig
    });
  };

  const close = () => {
    if (dialogRef.current) dialogRef.current.close();
    setConfig(null);
  };

  // 將 fire 方法賦值給全域物件，讓它可以在組件外呼叫
  MySwal.fire = fire;

  const value = useMemo(() => ({ fire, close }), []);

  return (
    <SwalContext.Provider value={value}>
      {children}
      {/* 渲染 Dialog 到 body 頂層，避免 z-index 或父層 overflow 問題 */}
      {config &&
        createPortal(
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <dialog
            ref={dialogRef}
            className="custom-swal-dialog"
            onCancel={close}
            onClick={(e) => (e.target as any) === dialogRef.current && close()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                close();
              }
            }}
          >
            <div className="swal-content">
              {config.showCloseButton && (
                <button type="button" className="close-x" onClick={close}>
                  &times;
                </button>
              )}

              <div className={`swal-icon icon-${config.icon}`}>
                {config.icon === 'info' ? 'i' : '!'}
              </div>

              <h3 className="swal-title">{config.title}</h3>

              <div className="swal-actions">
                {config.showConfirmButton && (
                  <button type="button" className="swal-confirm-btn" onClick={close}>
                    確定
                  </button>
                )}
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </SwalContext.Provider>
  );
}

// 也可以提供一個 Hook 給習慣 Hook 風格的人
export const useSwal = () => useContext(SwalContext);
