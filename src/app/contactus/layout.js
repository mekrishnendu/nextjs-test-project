import { Button } from '../utils/utils';

/**
 * Layouts in a route are nested by default.
 *  Each parent layout wraps child layouts below it using the React children prop.
 */

export default function ConactLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="header-section">
        <h2>Header Section</h2>
        <p>using loader, suspense, page layout</p>
      </div>

      {children}
      <div className="footer-section">
        <Button navigateTo="/" buttonType="button" className="btn-general">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
