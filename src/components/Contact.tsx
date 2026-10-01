import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useT } from "@/i18n/LanguageContext";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";
import Reveal from "@/components/Reveal";

const Contact = () => {
  const { t, lang } = useT();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject =
      lang === "en" ? `Website contact — ${formData.name}` : `Contacto web — ${formData.name}`;
    const body = `${formData.message}\n\n—\n${formData.name}\n${formData.email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast({ title: t("contact.toast.title"), description: t("contact.toast.desc") });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <img src="/media/bg-waves-3.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover bg-drift opacity-60" />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(224 52% 6% / 0.82) 35%, hsl(224 52% 6% / 0.82) 70%, hsl(var(--background)) 100%)" }} />
      <div className="relative container mx-auto px-4 max-w-5xl">
        <Reveal className="text-center mb-14">
          <h2 className="font-display font-bold tracking-tight text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] mb-5">
            {t("contact.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.lead")}</p>
        </Reveal>

        <div className="grid md:grid-cols-[7fr_5fr] gap-6">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-7 md:p-9 h-full glow-violet">
              <h3 className="font-display font-semibold text-xl mb-6">{t("contact.form.title")}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="sr-only" htmlFor="contact-name">{t("contact.form.name")}</label>
                <Input
                  id="contact-name"
                  placeholder={t("contact.form.name")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background h-12 rounded-xl"
                />
                <label className="sr-only" htmlFor="contact-email">{t("contact.form.email")}</label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder={t("contact.form.email")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background h-12 rounded-xl"
                />
                <label className="sr-only" htmlFor="contact-message">{t("contact.form.message")}</label>
                <Textarea
                  id="contact-message"
                  placeholder={t("contact.form.message")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-background resize-none rounded-xl"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-primary-glow bg-primary hover:bg-primary text-primary-foreground font-semibold rounded-xl"
                >
                  {t("contact.form.submit")} <Send className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">{t("contact.form.note")}</p>
              </form>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift block rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-primary/10">
                    <Linkedin className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-lg">{t("contact.linkedin.title")}</div>
                    <div className="text-sm text-muted-foreground">{t("contact.linkedin.desc")}</div>
                  </div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="card-lift block rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-secondary/10">
                    <Mail className="h-6 w-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-lg">{t("contact.email.title")}</div>
                    <div className="text-sm text-muted-foreground break-all">{CONTACT_EMAIL}</div>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
