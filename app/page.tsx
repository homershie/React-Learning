import Link from 'next/link';
import GarminCalculator from './components/GarminCalculator';

export default function Home() {
  return (
    <main>
      <nav className="nav-bar">
        <Link href="/" className="nav-link active">
          Garmin 計算器
        </Link>
        <Link href="/practices" className="nav-link">
          🎯 面試練習
        </Link>
      </nav>
      <GarminCalculator />
      <style jsx>{`
        .nav-bar {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          gap: 10px;
        }

        .nav-link {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .nav-link.active {
          background: #667eea;
          color: white;
        }

        @media (max-width: 768px) {
          .nav-bar {
            top: 10px;
            right: 10px;
            flex-direction: column;
          }

          .nav-link {
            padding: 8px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  );
}
