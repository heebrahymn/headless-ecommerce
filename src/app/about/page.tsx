import Image from "next/image";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} reveal`}>OUR STORY</div>
          <h1 className={`${styles.title} reveal`}>
            Modern <br />Minimalism
          </h1>
          <p className={`${styles.subtitle} reveal`}>
            We believe in the power of simplicity. Every piece we create is a testament to the beauty of intentional design.
          </p>
        </div>
        <div className={`${styles.heroImageContainer} reveal`}>
          <Image 
            src="/about-hero.png" 
            alt="Vessa Studio" 
            fill
            className={styles.heroImage}
          />
        </div>
      </header>

      <section className={styles.mission}>
        <div className={styles.missionGrid}>
          <div className={`${styles.missionText} reveal`}>
            <h2>Crafted with Purpose</h2>
            <p>
              Founded in 2025, Clothing Plug was born from a desire to strip away the noise of fast fashion. We focus on the essentials—those foundational pieces that define a wardrobe and stand the test of time.
            </p>
            <p>
              Our philosophy is rooted in the "Quiet Luxury" movement. We don't scream for attention; we earn it through superior materials, meticulous tailoring, and a palette that celebrates natural harmony.
            </p>
          </div>
          <div className={`${styles.stats} reveal`}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Organic Materials</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>12</span>
              <span className={styles.statLabel}>Curated Pieces</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Global Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.valueGrid}>
          <div className={`${styles.valueCard} reveal`}>
            <span className={styles.valueIcon}>✦</span>
            <h3>Sustainability</h3>
            <p>Our commitment to the planet is non-negotiable. We source only the finest sustainable fabrics.</p>
          </div>
          <div className={`${styles.valueCard} reveal`}>
            <span className={styles.valueIcon}>✦</span>
            <h3>Quality</h3>
            <p>Every stitch is inspected. We believe quality is the ultimate form of sustainability.</p>
          </div>
          <div className={`${styles.valueCard} reveal`}>
            <span className={styles.valueIcon}>✦</span>
            <h3>Timelessness</h3>
            <p>Design that transcends seasons. We create for the long term, not the next trend.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
