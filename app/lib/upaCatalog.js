// Single source of truth for what the WhatsApp agent tells customers UPA
// offers. Keep this in sync with `references/pricing-and-policies.md` in the
// upa-whatsapp-closer skill if that ever changes — this is the version the
// automated agent actually reads from.
//
// `examples` only lists things that are confirmed real UPA offerings — never
// add a specific brand/model name here unless it's been confirmed, since the
// agent treats everything in this file as fact it can state to a customer.

export const CATALOG = [
  {
    key: 'events',
    name: 'Eventos (cumpleaños, familiares, corporativos)',
    examples: ['fiestas de cumpleaños infantiles', 'eventos familiares', 'eventos corporativos'],
    pricing: 'custom',
  },
  {
    key: 'inflatables',
    name: 'Inflables',
    examples: [
      'catálogo de ~20 modelos, desde opciones chicas para toddlers hasta combos/obstacle course grandes',
    ],
    pricing: 'custom',
    notes: 'Cobertura en Miami-Dade y Broward.',
  },
  {
    key: 'entertainment',
    name: 'Animación y shows',
    examples: [
      'personajes',
      'face painting',
      'balloon twisting (globología)',
      'DJ / sonido / iluminación',
      'magia',
      'burbujas',
      'ciencia',
      'danza',
      'foam parties',
    ],
    pricing: 'custom',
  },
  {
    key: 'babysitting',
    name: 'Niñeras / babysitting',
    examples: ['cuidado de niños en el hogar, por horas'],
    pricing: '$120 mínimo por 4 horas, $28 por cada hora adicional',
  },
  {
    key: 'classes',
    name: 'Clases y deportes',
    examples: ['soccer', 'swimming (incl. a domicilio)', 'tennis', 'basketball', 'personal training'],
    pricing: 'custom',
    notes: 'Pago mensual y por adelantado; se puede recuperar una clase avisando con 24hs.',
  },
  {
    key: 'fitness',
    name: 'Fitness',
    examples: ['kosher zumba', 'circuit / functional training', 'stretching', 'personal trainer'],
    pricing: 'custom',
  },
  {
    key: 'massage',
    name: 'Masajes',
    examples: ['a domicilio', 'en la oficina de UPA en Aventura'],
    pricing: '$80 por sesión a domicilio (60 min); $60 por sesión en oficina UPA (60 min)',
  },
  {
    key: 'cleaning',
    name: 'Cleaning',
    examples: ['limpieza del hogar'],
    pricing: '$120 por 4 horas; tiempo extra según tamaño de la casa',
  },
  {
    key: 'transportation',
    name: 'Transporte',
    examples: ['traslados'],
    pricing: 'aproximadamente 30% más que la tarifa de Uber para el mismo trayecto',
  },
  {
    key: 'catering',
    name: 'Catering',
    examples: ['comida para eventos, con o sin servicio de entrega/mozo'],
    pricing: 'custom',
  },
  {
    key: 'bar-service',
    name: 'Bar service',
    examples: ['asociado a eventos de condominios'],
    pricing: 'custom',
  },
  {
    key: 'b2b',
    name: 'B2B / institucional',
    examples: ['condominios', 'hoteles', 'escuelas', 'sinagogas / comunidad judía', 'agencias de viaje', 'salones', 'empresas'],
    pricing: 'custom',
  },
];

/** Renders the catalog as a compact text block for the system prompt. */
export function renderCatalogForPrompt() {
  return CATALOG.map((c) => {
    const price = c.pricing === 'custom' ? 'precio a medida, cotización caso a caso' : c.pricing;
    const notes = c.notes ? ` (${c.notes})` : '';
    return `- **${c.name}**: ${c.examples.join(', ')}. Precio: ${price}.${notes}`;
  }).join('\n');
}
