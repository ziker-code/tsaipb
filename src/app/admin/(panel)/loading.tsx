import { Icon } from "@/components/icon";

export default function AdminLoading() {
  return (
    <div className="grid min-h-[50vh] place-items-center text-muted">
      <Icon name="sync" className="size-6 animate-spin" aria-label="Memuat" />
    </div>
  );
}
