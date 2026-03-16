import BrandLogo from "@/components/BrandLogo";
import { redesSociales } from "../SocialIcons";

const Footer = () => (
  <footer className="bg-surface border-t border-border py-12">
    <div className="section-container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <BrandLogo />
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            Automatización e Inteligencia Artificial para empresas que quieren crecer sin límites.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#beneficios" className="hover:text-foreground transition-colors">Beneficios</a></li>
            <li><a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a></li>
            <li><a href="#como-funciona" className="hover:text-foreground transition-colors">Cómo funciona</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground mb-3">Contacto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>efficiencia22@gmail.com</li>
            {/* <li>+52 (449) 514-8888</li> */}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground mb-3">Síguenos</h4>
          <div className="flex gap-3">
            {redesSociales.map((red, i) => (
              <a
                key={i}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                <red.Icon className={"w-4 h-4"} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EfficiencIA. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
