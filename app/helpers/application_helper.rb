module ApplicationHelper

  def get_ethnicity code
    {
      nra: 'Nonresident aliens',
      asi: 'Asian American',
      blk: 'Black',
      his: 'Hispanic',
      ind: 'American Indian',
      pac: 'Pacific Islander',
      unk: 'Unknown',
      wht: 'White',
      tot: 'Program Totals',
      two: 'Two or More'
    }[code.to_sym]
  end
end
