import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-green-dark text-primary-foreground">
      <div className="container-main px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-3">Barooka VCO</h3>
            <p className="text-sm font-body text-primary-foreground/70 leading-relaxed">
              Virgin Coconut Oil premium berkualitas tinggi, diproses secara cold-pressed dari kelapa segar pilihan
              Indonesia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-3">Navigasi</h4>
            <div className="flex flex-col gap-2">
              {["Beranda", "Keunggulan", "Produk", "Kontak"].map((label) => (
                <button
                  key={label}
                  onClick={() => scrollTo(`#${label.toLowerCase()}`)}
                  className="text-sm font-body text-primary-foreground/70 hover:text-gold-light transition-colors text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-display font-semibold mb-3">Informasi</h4>
            <p className="text-sm font-body text-primary-foreground/70 leading-relaxed">
              PT Barooka Global Indonesia
              <br />
              AD Premier 9th Floor
              <br />
              Jl. TB Simatupang No. 5<br />
              Ragunan, Pasar Minggu
              <br />
              South Jakarta 12550
              <br />
              +62 856-4748-6700
              <br />
              info@virgincoconutoil.id
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-xs font-body text-primary-foreground/50">
            © {new Date().getFullYear()} Barooka VCO. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
