import BrandLogo from "@/components/BrandLogo";
import { redesSociales } from "../SocialIcons";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="section-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo />
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">{t("footer.navTitle")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#beneficios" className="hover:text-foreground transition-colors">{t("footer.nav.benefits")}</a></li>
              <li><a href="#servicios" className="hover:text-foreground transition-colors">{t("footer.nav.services")}</a></li>
              <li><a href="#como-funciona" className="hover:text-foreground transition-colors">{t("footer.nav.howItWorks")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">{t("footer.contactTitle")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>efficiencia22@gmail.com</li>
              {/* <li>+52 (449) 514-8888</li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">{t("footer.socialTitle")}</h3>
            <div className="flex gap-3">
              {redesSociales.map((red, i) => (
                <a
                  key={i}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label={red.ariaLabel}
                >
                  <red.Icon className={"w-4 h-4"} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          {t("footer.rights", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;