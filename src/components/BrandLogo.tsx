const BrandLogo = ({ className = "" }: { className?: string }) => (
  <span className={`text-xl md:text-2xl font-extrabold tracking-tight ${className}`}>
    <span className="text-foreground">Efficienc</span>
    <span className="text-brand-ia">IA</span>
  </span>
);

export default BrandLogo;
