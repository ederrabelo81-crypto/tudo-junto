import { Link } from 'react-router-dom';
import { Store, Wrench } from 'lucide-react';
import { GlassIcon } from '@/components/ui/GlassIcon';

export function NegociosServicosBlock() {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
        <GlassIcon icon={Store} size="xs" variant="primary" />
        Negócios & Serviços
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/categoria/negocios"
          className="flex items-center gap-3 bg-card rounded-2xl p-4 card-shadow hover:card-shadow-hover transition-all active:scale-95"
        >
          <GlassIcon icon={Store} size="md" variant="primary" />
          <div>
            <h3 className="font-semibold text-foreground">Negócios</h3>
            <p className="text-xs text-muted-foreground">Lojas e comércio</p>
          </div>
        </Link>

        <Link
          to="/categoria/servicos"
          className="flex items-center gap-3 bg-card rounded-2xl p-4 card-shadow hover:card-shadow-hover transition-all active:scale-95"
        >
          <GlassIcon icon={Wrench} size="md" variant="accent" />
          <div>
            <h3 className="font-semibold text-foreground">Serviços</h3>
            <p className="text-xs text-muted-foreground">Prestadores</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
