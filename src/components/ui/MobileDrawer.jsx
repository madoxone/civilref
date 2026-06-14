/**
 * Slide-in drawer for mobile menus. Click outside to close.
 * Render children directly inside; this just provides the overlay + panel.
 */
export function MobileDrawer({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 z-[180] flex items-stretch"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[86%] max-w-[300px] bg-bg border-r border-border py-4 overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
}
