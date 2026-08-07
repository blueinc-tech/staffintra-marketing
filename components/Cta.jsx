import Reveal from './Reveal';
import DemoForm from './DemoForm';

export default function Cta() {
  return (
    <section className="cta" id="demo">
      <div className="container">
        <Reveal className="cta-panel">
          <div className="cta-copy">
            <h2>See StaffIntra on your team&apos;s schedule.</h2>
            <p>
              A 30-minute walkthrough with your rota, your policies, and your questions. If it
              fits, you can pilot with one team next week.
            </p>
            <ul className="checklist light">
              <li>Guided demo, tailored to how your team works</li>
              <li>Pilot with one team free for 30 days</li>
              <li>Import from spreadsheets — we help with setup</li>
            </ul>
          </div>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}
