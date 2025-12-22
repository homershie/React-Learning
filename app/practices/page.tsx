'use client';

import { useState } from 'react';
import Link from 'next/link';
import UseStatePractice from '../components/practices/UseStatePractice';
import UseEffectPractice from '../components/practices/UseEffectPractice';
import ErrorHandlingPractice from '../components/practices/ErrorHandlingPractice';

type PracticeTab = 'useState' | 'useEffect' | 'errorHandling';

export default function PracticesPage() {
  const [activeTab, setActiveTab] = useState<PracticeTab>('useState');

  return (
    <div className="practices-container">
      <nav className="nav-bar">
        <Link href="/" className="nav-link">
          Garmin 計算器
        </Link>
        <Link href="/practices" className="nav-link active">
          🎯 面試練習
        </Link>
      </nav>
      <div className="practices-header">
        <h1>🎯 React 面試練習區</h1>
        <p>面試常考的變化題練習</p>
      </div>

      <div className="practices-tabs">
        <button
          className={activeTab === 'useState' ? 'active' : ''}
          onClick={() => setActiveTab('useState')}
        >
          useState 更新物件
        </button>
        <button
          className={activeTab === 'useEffect' ? 'active' : ''}
          onClick={() => setActiveTab('useEffect')}
        >
          useEffect 依賴陣列
        </button>
        <button
          className={activeTab === 'errorHandling' ? 'active' : ''}
          onClick={() => setActiveTab('errorHandling')}
        >
          錯誤處理技巧
        </button>
      </div>

      <div className="practices-content">
        {activeTab === 'useState' && <UseStatePractice />}
        {activeTab === 'useEffect' && <UseEffectPractice />}
        {activeTab === 'errorHandling' && <ErrorHandlingPractice />}
      </div>

      <style jsx>{`
        .practices-container {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .practices-header {
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        .practices-header h1 {
          font-size: 36px;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .practices-header p {
          font-size: 18px;
          opacity: 0.9;
        }

        .practices-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .practices-tabs button {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .practices-tabs button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .practices-tabs button.active {
          background: white;
          color: #667eea;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .practices-content {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

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
          background: white;
          color: #667eea;
        }

        @media (max-width: 768px) {
          .practices-container {
            padding: 20px 10px;
          }

          .practices-header h1 {
            font-size: 28px;
          }

          .practices-content {
            padding: 20px;
          }

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
    </div>
  );
}

