export const mockExplain = {
  layperson:
    "Think of graphene as a single, invisible sheet of chicken-wire made out of carbon atoms.",
  intermediate:
    `Graphene is a two-dimensional allotrope of carbon where each atom is sp²-bonded
     to three neighbors, forming a hexagonal lattice only one atom thick.
     It exhibits ballistic electron transport, exceptional tensile strength,
     and high thermal conductivity.`,
  developer:
    `Physical properties stem from its linear E-k dispersion near the K points, giving
     rise to massless Dirac fermions. In practice, mobility exceeds
     200,000 cm²/V·s at 4 K. Synthesis routes include mechanical exfoliation,
     CVD on Cu/Ni, and SiC epitaxial growth.`
} satisfies Record<'layperson'|'intermediate'|'developer', string>;
