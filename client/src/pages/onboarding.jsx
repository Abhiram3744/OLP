import { useMemo, useState } from 'react';
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import './onboarding.css';

const steps = ['Welcome', 'Profile', 'Career', 'Skills', 'Preferences', 'Review'];
const statuses = ['Student', 'Graduate', 'Working Professional'];
const degrees = ['B.Tech / BE', 'BCA', 'BSc', 'MCA', 'M.Tech', 'Diploma', 'Other'];
const branches = ['Computer Science', 'Information Science', 'AI / ML', 'Data Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil', 'Other'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
const experiences = ['Just Starting', 'Beginner', 'Intermediate', 'Advanced'];
const goals = ['Internship', 'Campus Placement', 'Full-Time Job', 'Skill Development'];
const languages = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Other'];
const skillLevels = ['Never Learned', 'Beginner', 'Intermediate', 'Strong'];
const studyTimes = ['Less than 1 hour', '1–2 hours', '2–4 hours', '4+ hours'];
const durations = ['1 Month', '3 Months', '6 Months', '12 Months', 'Custom Date'];
const focusOptions = ['DSA', 'Development', 'CS Fundamentals', 'Aptitude', 'Projects', 'Resume', 'Interview Preparation'];

const roles = [
  ['Software Engineer', 'Build reliable products and solve technical problems.', '⌘'],
  ['Frontend Developer', 'Create polished, accessible user experiences.', '◇'],
  ['Backend Developer', 'Design APIs, services, and scalable systems.', '⚙'],
  ['Full Stack Developer', 'Work across the complete product stack.', '▣'],
  ['Data Analyst', 'Turn data into clear, actionable insights.', '↗'],
  ['Data Scientist', 'Build models and uncover patterns in data.', '∿'],
  ['Cloud / DevOps Engineer', 'Automate and operate cloud infrastructure.', '☁'],
  ['AI / ML Engineer', 'Build intelligent, production-ready systems.', '✦'],
  ['Cybersecurity', 'Protect applications, networks, and data.', '⬡'],
  ['Other', 'Create a flexible path around your goal.', '＋'],
];

const skillNames = {
  dsa: 'DSA', oop: 'OOP', dbms: 'DBMS', operatingSystems: 'Operating Systems',
  computerNetworks: 'Computer Networks', gitGithub: 'Git & GitHub',
  webDevelopment: 'Web Development', projects: 'Projects', aptitude: 'Aptitude',
};

const initialData = {
  currentStatus: '', degree: '', branch: '', currentYear: '', codingExperience: '',
  targetRole: '', goalType: '', programmingLanguages: [],
  skills: Object.fromEntries(Object.keys(skillNames).map((key) => [key, ''])),
  dailyStudyHours: '', studyDaysPerWeek: 5, targetDuration: '', targetDate: '', focusAreas: [],
};

function Brand() {
  return <div className="onboarding-brand" aria-label="PrepForge"><span className="onboarding-mark" aria-hidden="true">PF</span><span>Prep<span>Forge</span></span></div>;
}

function ProgressStepper({ currentStep }) {
  return <nav className="progress-stepper" aria-label="Onboarding progress">
    {steps.map((label, index) => <div className={`progress-item ${index < currentStep ? 'complete' : ''} ${index === currentStep ? 'active' : ''}`} key={label} aria-current={index === currentStep ? 'step' : undefined}>
      <span className="step-dot">{index < currentStep ? '✓' : index + 1}</span><span className="step-label">{label}</span>
    </div>)}
  </nav>;
}

function SelectionCard({ selected, onClick, children, className = '' }) {
  return <button type="button" className={`selection-card ${selected ? 'selected' : ''} ${className}`} aria-pressed={selected} onClick={onClick}>{children}<span className="selection-check" aria-hidden="true">✓</span></button>;
}

function ChoiceGrid({ options, value, onChange, className = '' }) {
  return <div className={`choice-grid ${className}`}>{options.map((option) => <SelectionCard key={option} selected={value === option} onClick={() => onChange(option)}><span>{option}</span></SelectionCard>)}</div>;
}

function Chips({ options, values, onToggle }) {
  return <div className="chips">{options.map((option) => <button type="button" className={values.includes(option) ? 'chip selected' : 'chip'} aria-pressed={values.includes(option)} onClick={() => onToggle(option)} key={option}>{values.includes(option) && <span aria-hidden="true">✓</span>}{option}</button>)}</div>;
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return <header className="step-heading"><span>{eyebrow}</span><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</header>;
}

function Field({ label, children }) {
  return <section className="form-section"><h2>{label}</h2>{children}</section>;
}

function WelcomeStep() {
  return <div className="welcome-step"><div className="welcome-art" aria-hidden="true"><span>✓</span></div><SectionTitle eyebrow="LET'S GET STARTED" title="Welcome to PrepForge 👋" subtitle="Let's build a personalized preparation roadmap based on your goals, skills, and available study time." /><p className="supporting-copy">This setup only takes a few minutes.</p><div className="welcome-points"><span>✓ Tailored to your goals</span><span>✓ Built around your schedule</span><span>✓ Adapts to your current skills</span></div></div>;
}

function ProfileStep({ data, update }) {
  return <><SectionTitle eyebrow="ABOUT YOU" title="Tell us about yourself" subtitle="A little context helps us start your roadmap at the right place." />
    <Field label="Current status"><ChoiceGrid options={statuses} value={data.currentStatus} onChange={(currentStatus) => update({ currentStatus })} /></Field>
    {data.currentStatus === 'Student' && <div className="student-fields"><label>Degree<select value={data.degree} onChange={(e) => update({ degree: e.target.value })}><option value="">Select your degree</option>{degrees.map((item) => <option key={item}>{item}</option>)}</select></label><label>Branch<select value={data.branch} onChange={(e) => update({ branch: e.target.value })}><option value="">Select your branch</option>{branches.map((item) => <option key={item}>{item}</option>)}</select></label><label>Current year<select value={data.currentYear} onChange={(e) => update({ currentYear: e.target.value })}><option value="">Select your year</option>{years.map((item) => <option key={item}>{item}</option>)}</select></label></div>}
    <Field label="Coding experience"><ChoiceGrid options={experiences} value={data.codingExperience} onChange={(codingExperience) => update({ codingExperience })} /></Field></>;
}

function CareerStep({ data, update }) {
  return <><SectionTitle eyebrow="YOUR DIRECTION" title="What are you preparing for?" subtitle="Choose one primary role. You can always refine this later." />
    <Field label="Target role"><div className="role-grid">{roles.map(([title, description, icon]) => <SelectionCard className="role-card" key={title} selected={data.targetRole === title} onClick={() => update({ targetRole: title })}><span className="role-icon" aria-hidden="true">{icon}</span><span><strong>{title}</strong><small>{description}</small></span></SelectionCard>)}</div></Field>
    <Field label="What is your main goal?"><ChoiceGrid options={goals} value={data.goalType} onChange={(goalType) => update({ goalType })} /></Field></>;
}

function SkillsStep({ data, update, setSkill }) {
  const toggleLanguage = (language) => update({ programmingLanguages: data.programmingLanguages.includes(language) ? data.programmingLanguages.filter((item) => item !== language) : [...data.programmingLanguages, language] });
  return <><SectionTitle eyebrow="SKILL CHECK" title="Where are you right now?" subtitle="Tell us what you already know so your roadmap starts from the right level." />
    <Field label="Programming languages"><p className="field-help">Select all that apply.</p><Chips options={languages} values={data.programmingLanguages} onToggle={toggleLanguage} /></Field>
    <Field label="Skill levels"><div className="skill-table">{Object.entries(skillNames).map(([key, label]) => <div className="skill-row" key={key}><strong>{label}</strong><div>{skillLevels.map((level) => <button type="button" className={data.skills[key] === level ? 'selected' : ''} aria-pressed={data.skills[key] === level} onClick={() => setSkill(key, level)} key={level}>{level}</button>)}</div></div>)}</div></Field></>;
}

function PreferencesStep({ data, update }) {
  const toggleFocus = (focus) => update({ focusAreas: data.focusAreas.includes(focus) ? data.focusAreas.filter((item) => item !== focus) : [...data.focusAreas, focus] });
  return <><SectionTitle eyebrow="YOUR ROUTINE" title="Build your preparation schedule" subtitle="Choose a pace that feels realistic and sustainable for you." />
    <Field label="Daily study time"><ChoiceGrid options={studyTimes} value={data.dailyStudyHours} onChange={(dailyStudyHours) => update({ dailyStudyHours })} /></Field>
    <div className="preference-row"><Field label="Study days per week"><div className="stepper"><button type="button" aria-label="Decrease study days" disabled={data.studyDaysPerWeek === 1} onClick={() => update({ studyDaysPerWeek: data.studyDaysPerWeek - 1 })}>−</button><output><strong>{data.studyDaysPerWeek}</strong><span>days</span></output><button type="button" aria-label="Increase study days" disabled={data.studyDaysPerWeek === 7} onClick={() => update({ studyDaysPerWeek: data.studyDaysPerWeek + 1 })}>＋</button></div></Field>
      <Field label="Target timeline"><select value={data.targetDuration} onChange={(e) => update({ targetDuration: e.target.value, targetDate: e.target.value === 'Custom Date' ? data.targetDate : '' })}><option value="">Select a timeline</option>{durations.map((item) => <option key={item}>{item}</option>)}</select>{data.targetDuration === 'Custom Date' && <input className="date-input" type="date" value={data.targetDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => update({ targetDate: e.target.value })} />}</Field></div>
    <Field label="Focus areas"><p className="field-help">Pick all the areas you want included.</p><Chips options={focusOptions} values={data.focusAreas} onToggle={toggleFocus} /></Field></>;
}

function ReviewStep({ data, onEdit }) {
  const items = [['Current status', data.currentStatus], ['Coding level', data.codingExperience], ['Target role', data.targetRole], ['Main goal', data.goalType], ['Languages', data.programmingLanguages.join(', ')], ['Daily preparation', data.dailyStudyHours], ['Study days', `${data.studyDaysPerWeek} days / week`], ['Target', data.targetDuration === 'Custom Date' ? data.targetDate : data.targetDuration], ['Focus areas', data.focusAreas.join(', ')]];
  return <><SectionTitle eyebrow="READY TO FORGE" title="Your PrepForge Plan" subtitle="Take a final look. You can go back and change anything before we begin." /><div className="review-grid">{items.map(([label, value], index) => <div className="review-item" key={label}><span>{label}</span><strong>{value}</strong><button type="button" onClick={() => onEdit(index < 2 ? 1 : index < 4 ? 2 : index === 4 ? 3 : 4)}>Edit</button></div>)}</div></>;
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const update = (values) => { setData((current) => ({ ...current, ...values })); setError(''); };
  const setSkill = (key, value) => { setData((current) => ({ ...current, skills: { ...current.skills, [key]: value } })); setError(''); };
  const validation = useMemo(() => {
    if (currentStep === 1) {
      if (!data.currentStatus) return 'Please select your current status.';
      if (data.currentStatus === 'Student' && (!data.degree || !data.branch || !data.currentYear)) return 'Please complete your student details.';
      if (!data.codingExperience) return 'Please select your coding experience.';
    }
    if (currentStep === 2 && (!data.targetRole || !data.goalType)) return 'Please select your target role and main goal.';
    if (currentStep === 3) {
      if (!data.programmingLanguages.length) return 'Please select at least one programming language.';
      if (Object.values(data.skills).some((value) => !value)) return 'Please choose a level for every skill.';
    }
    if (currentStep === 4) {
      if (!data.dailyStudyHours) return 'Please select your daily study time.';
      if (!data.targetDuration || (data.targetDuration === 'Custom Date' && !data.targetDate)) return 'Please select your target timeline.';
      if (!data.focusAreas.length) return 'Please select at least one focus area.';
    }
    return '';
  }, [currentStep, data]);

  const next = () => { if (validation) { setError(validation); return; } setError(''); setCurrentStep((step) => Math.min(step + 1, steps.length - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const back = () => { setError(''); setCurrentStep((step) => Math.max(step - 1, 0)); };
 const handleSubmit = async () => {
  setSubmitting(true);
  setError('');

  try {
    const response = await fetch('http://localhost:5000/api/roadmap/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
  firebaseUid: user.uid,
  ...data,
}),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to generate roadmap.');
    }

    console.log('Generated roadmap:', result);
     navigate('/Dashboard');

  } catch (error) {
    console.error('Roadmap generation failed:', error);
    setError(error.message || 'Failed to generate roadmap.');
  } finally {
    setSubmitting(false);
  }
};
  const views = [<WelcomeStep />, <ProfileStep data={data} update={update} />, <CareerStep data={data} update={update} />, <SkillsStep data={data} update={update} setSkill={setSkill} />, <PreferencesStep data={data} update={update} />, <ReviewStep data={data} onEdit={setCurrentStep} />];

  return <main className="onboarding-page"><div className="onboarding-shell"><Brand /><ProgressStepper currentStep={currentStep} /><section className="onboarding-card"><div className="step-content" key={currentStep}>{views[currentStep]}</div>{error && <p className="onboarding-error" role="alert">{error}</p>}<footer className="onboarding-actions">{currentStep > 0 && <button className="back-button" type="button" onClick={back} disabled={submitting}>← Back</button>}<span />{currentStep < steps.length - 1 ? <button className="continue-button" type="button" onClick={next}>{currentStep === 0 ? 'Get Started' : 'Continue'} <span aria-hidden="true">→</span></button> : <button className="continue-button submit-button" type="button" onClick={handleSubmit} disabled={submitting}>{submitting ? <><i className="button-spinner" />Forging your roadmap...</> : <>Generate My Roadmap <span aria-hidden="true">→</span></>}</button>}</footer></section><p className="onboarding-note">Your answers help personalize your roadmap. You can update them anytime.</p></div></main>;
}
