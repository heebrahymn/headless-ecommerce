'use client';
import { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItem {
  title: string;
  content: string | React.ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <button 
            className={styles.header} 
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className={styles.title}>{item.title}</span>
            <span className={`${styles.icon} ${openIndex === index ? styles.rotate : ''}`}>+</span>
          </button>
          <div className={`${styles.contentWrapper} ${openIndex === index ? styles.open : ''}`}>
            <div className={styles.content}>
              {typeof item.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                item.content
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
