export default function SectionHeading({ eyebrow, title, description, light = false, align = 'left' }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''} section-heading-${align}`}>
      {eyebrow && <span className="eyebrow"><i /> {eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
