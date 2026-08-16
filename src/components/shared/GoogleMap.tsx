interface GoogleMapProps {
  query?: string;
  className?: string;
}

export default function GoogleMap({ query = "Cundinamarca, Colombia", className }: GoogleMapProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=9&output=embed`;

  return (
    <div className={className}>
      <iframe
        title="Zona de cobertura ElectroKW"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[320px] w-full rounded-2xl"
      />
    </div>
  );
}
