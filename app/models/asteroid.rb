class Asteroid < ActiveRecord::Base
  scope :by_condition_code, -> {
    where.not(condition_code: nil).group(:condition_code).count.map { |k,v| { condition_code: k, count: v } }
  }
  scope :perihelion_not_null, -> { where.not q: nil }
  scope :aphelion_not_null, -> { where.not ad: nil }
  scope :mass_not_null, -> { where.not gm: nil }
  scope :incline_not_null, -> { where.not i: nil }
  scope :diameter_not_null, -> { where.not diameter: nil }
  scope :perihelion_aphelion_diameter, -> do
    perihelion_not_null.aphelion_not_null.diameter_not_null.order(i: :desc).limit(1000).map do |a|
    { full_name: a.full_name,
      perihelion: a.q,
      aphelion: a.ad,
      mass: a.mass,
      diameter: a.diameter,
      condition_code: a.condition_code }
    end
  end

  # NASA's data labels assume some familiarity with the domain -
  def name_map
    {
      full_name: "Full Name",
      a: "a (AU)",
      e: "Eccentricity",
      i: "i (deg)",
      om: "node (deg)", # An orbital node is one of the two points where an orbit crosses a plane of reference to which it is inclined
      w: "peri (deg)",
      q: "Perihelion (AU)",
      ad: "Aphelion (AU)",
      per_y: "period (years)",
      data_arc: "data-arc span (d)",
      condition_code: "condition code",
      n_obs_used: "# obs. used (total)",
      n_del_obs_used: "# obs. used (del.)",
      n_dop_obs_used: "# obs. used (dop.)",
      H: "H (mag)",
      diameter: "diameter (km)",
      extent: "extent (km)",
      albedo: "albedo",
      rot_per: "rot_per (h)",
      GM: "GM (km^3/s^2)",
      BV: "B-V (mag)",
      UB: "U-B (mag)",
      spec_B: "spec. type (SMASSII)",
      spec_T: "spec. type (Tholen)"
    }
  end

  def mass
    (gm || 0)/(6.67408 * 10**-11)
  end
end
