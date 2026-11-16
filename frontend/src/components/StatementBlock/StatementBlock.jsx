import { motion } from 'framer-motion';
import './StatementBlock.css';

// Full-width statement: eyebrow, two big masked lines, short text and a footer row.
// `k` is the i18n prefix (eyebrow, line1, line2, text, label); `footerEnd` fills the footer's other end.
// `flip` mirrors the layout: title on the left, text on the right.
const StatementBlock = ({ id, k, t, footerEnd, flip }) => (
    <section className={`sl-section${flip ? ' sl-section--flip' : ''}`} aria-labelledby={id}>
        <div className="sl-inner">
            <p className="sl-eyebrow">{t(`${k}.eyebrow`)}</p>

            <div className="sl-main">
                {/* the title is observed (not each line): a line hidden inside its mask never counts as in view */}
                <motion.h2
                    id={id}
                    className="sl-title"
                    initial="hidden"
                    whileInView="shown"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    {[t(`${k}.line1`), t(`${k}.line2`)].map((line, i) => (
                        <span className="sl-line" key={i}>
                            <motion.span
                                className="sl-line-inner"
                                variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {line}
                            </motion.span>
                        </span>
                    ))}
                </motion.h2>

                <motion.div
                    className="sl-aside"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="sl-text">{t(`${k}.text`)}</p>
                    <span className="sl-dash" aria-hidden="true" />
                </motion.div>
            </div>

            <div className="sl-footer">
                <span className="sl-label">{t(`${k}.label`)}</span>
                {footerEnd}
            </div>
        </div>
    </section>
);

export default StatementBlock;
