import { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function PortfolioModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-bg/98 backdrop-blur-md opacity-100 transition-all duration-300">
      <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 rounded-2xl bg-brand-white hover:bg-brand-accent text-brand-secondary hover:text-white border border-brand-border hover:border-brand-accent flex items-center justify-center transition-all duration-300 shadow-2xl" aria-label="Close modal">
        <X className="w-6 h-6" />
      </button>

      <div className="w-full h-full overflow-y-auto px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="rounded-3xl glass-panel border-brand-border bg-brand-white p-8 md:p-12 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">{project.category}</span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-brand-primary leading-tight">{project.title}</h3>
              <div className="flex gap-8 my-2 border-y border-brand-border py-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider">Client</span>
                  <span className="text-sm font-bold text-brand-primary mt-0.5">{project.client}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider">Year</span>
                  <span className="text-sm font-bold text-brand-primary mt-0.5">{project.year}</span>
                </div>
              </div>
              <p className="text-sm text-brand-secondary leading-relaxed font-medium">{project.desc}</p>
            </div>
            <div className="flex-shrink-0">
              <button onClick={onClose} className="inline-block px-8 py-4 rounded-xl bg-brand-accent text-white hover:bg-brand-accent-hover font-bold text-sm tracking-wide shadow-xl shadow-brand-accent/5 transition-all duration-300 hover:scale-105 active:scale-95">
                Enquire About Similar Project
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full items-center">
            {project.video ? (
              <video
                src={project.video}
                controls
                autoPlay
                className="w-full max-w-5xl rounded-2xl md:rounded-3xl border border-slate-900 shadow-2xl object-contain bg-black aspect-video"
              />
            ) : (
              (project.images || [project.image]).map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={project.title}
                  className="w-full max-w-5xl rounded-2xl md:rounded-3xl border border-slate-900 shadow-2xl object-contain cursor-zoom-in transition-all duration-300 hover:border-slate-800"
                  loading="lazy"
                  onClick={() => window.open(imgSrc, '_blank')}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoModal({ src, onClose }) {
  if (!src) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-bg/98 backdrop-blur-md opacity-100 transition-all duration-300 flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 rounded-2xl bg-brand-white hover:bg-brand-accent text-brand-secondary hover:text-white border border-brand-border hover:border-brand-accent flex items-center justify-center transition-all duration-300 shadow-2xl" aria-label="Close video modal">
        <X className="w-6 h-6" />
      </button>
      <div className="max-w-5xl w-full aspect-video rounded-3xl overflow-hidden relative shadow-2xl border border-brand-border bg-black flex items-center justify-center">
        <video src={src} controls autoPlay className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

export function EnquiryModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'all', message: '' });
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ msg: 'Please fill in all required fields (Name, Email, Message).', success: false });
      setTimeout(() => setToast(null), 4500);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setToast({ msg: 'Please enter a valid email address.', success: false });
      setTimeout(() => setToast(null), 4500);
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          project_type: form.projectType,
          message: form.message,
          to_email: 'harsheasyskill501@gmail.com',
        },
        { publicKey: 'YOUR_PUBLIC_KEY' }
      );
      setToast({ msg: "Thank you! Your message has been sent successfully. Harsh will contact you shortly.", success: true });
      setTimeout(() => { setToast(null); onClose(); }, 4500);
      setForm({ name: '', email: '', phone: '', projectType: 'all', message: '' });
    } catch (err) {
      setToast({ msg: 'Failed to send message. Please try again or email directly at harsheasyskill501@gmail.com', success: false });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-bg/98 backdrop-blur-md opacity-100 transition-all duration-300 flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 rounded-2xl bg-brand-white hover:bg-brand-accent text-brand-secondary hover:text-white border border-brand-border hover:border-brand-accent flex items-center justify-center transition-all duration-300 shadow-2xl" aria-label="Close modal">
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-2xl w-full rounded-3xl glass-panel p-8 md:p-10 border-brand-border bg-brand-white shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold text-brand-primary mb-2">Send an Enquiry</h3>
        <p className="text-xs text-brand-secondary mb-6">Outline your project requirements and I will get back to you shortly.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">Full Name <span className="text-brand-accent">*</span></label>
              <input type="text" id="name" required placeholder="John Doe" value={form.name} onChange={handleChange} className="form-input px-4 py-3.5 rounded-xl text-sm font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">Email Address <span className="text-brand-accent">*</span></label>
              <input type="email" id="email" required placeholder="john@example.com" value={form.email} onChange={handleChange} className="form-input px-4 py-3.5 rounded-xl text-sm font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">Phone Number</label>
              <input type="tel" id="phone" placeholder="9876543210" value={form.phone} onChange={handleChange} className="form-input px-4 py-3.5 rounded-xl text-sm font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="projectType" className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">Project Type</label>
              <select id="projectType" value={form.projectType} onChange={handleChange} className="form-input px-4 py-3.5 rounded-xl text-sm font-medium">
                <option value="all">All (Design & Social Media)</option>
                <option value="social">Social Media Post Design / Management</option>
                <option value="branding">Brand Identity Design</option>
                <option value="logo">Logo Design</option>
                <option value="packaging">Packaging Design</option>
                <option value="print">Print & Brochures</option>
                <option value="other">Other / Custom Request</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">Your Message <span className="text-brand-accent">*</span></label>
            <textarea id="message" required rows="5" placeholder="Outline your project requirements..." value={form.message} onChange={handleChange} className="form-input px-4 py-3.5 rounded-xl text-sm font-medium resize-none"></textarea>
          </div>

          <button type="submit" disabled={sending} className="w-full py-4 rounded-2xl bg-brand-accent text-white hover:bg-brand-accent-hover font-bold text-center shadow-lg shadow-brand-accent/10 hover:shadow-brand-accent/30 hover:scale-101 active:scale-98 transition-all duration-300 btn-premium mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
            {sending ? 'Sending...' : 'Send Message'}
          </button>

          <p className="text-center text-xs text-brand-secondary mt-2 font-medium">
            By submitting, you agree to Harsh Chauhan's response times (typically under 12 hours).
          </p>
        </form>
      </div>

      {toast && (
        <div className={`fixed bottom-6 left-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border transition-all duration-500 ${
          toast.success
            ? 'bg-slate-900 border-emerald-500/30 text-emerald-400'
            : 'bg-slate-900 border-rose-500/30 text-rose-400'
        }`}>
          <span className="text-sm font-medium text-slate-200">{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
