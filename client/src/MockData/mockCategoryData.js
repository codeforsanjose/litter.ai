const categoryData = {
  plastic: {
    name: 'Plastic',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Not all plastic is recyclable, even if you see the chasing arrows sign!\nIf the plastic sign has a number #1 or #2 inside of the chasing arrows, it is most likely recyclable.',
    desc_long: '<p>Not all plastic is recyclable, even if you see the chasing arrows sign!</p>\n<p>If the Plastic sign has a number #1 or #2 inside of the chasing arrows, it is most likely recyclable.</p>\n<p>Sometimes, Plastic #5 is recyclable but check with your zip code to be most certain.</p>\n<p>Most other numbers (i.e. 3, 4, 6, 7) should be sent to landfill.</p>\n<p>To be recycled, plastics should be clean of food/residue.</p>\n<p>Soft plastics like plastic bags or saran wrap should be thrown in the trash.</p>\n<p>Cosmetics should only be recycled if the item is not mixed with metal, and if the cosmetic portion is removed.</p>',
  },
  metal: {
    name: 'Metal',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Most types of metal are recyclable!\nAluminum/tin cans are recyclable.  Rinsing/washing them first will help their recyclability and keep your kitchen smelling fresh.\nMixed items (combination metal, plastic, or glass) should be separated into their component parts.\n',
    desc_long: '<p>Most types of metal are recyclable!</p>\n<p>Aluminum/tin cans are recyclable.  Rinsing/washing them first will help their recyclability and keep your kitchen smelling fresh.</p>\n<p>Mixed items (combination metal, plastic, or glass) should be separated into their component parts.</p>',
  },
  cardboard: {
    name: 'Cardboard',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Most cardboard is recyclable.  Break cardboard down so it lays flat to save space in your bin.\nRemove any plastic from the cardboard.  If soiled (with food), it can go into compost.',
    desc_long: '<p>Cardboard is one of the easiest and most common materials to recycle!</p>\n<p>It’s best to break down cardboard so that it lays flat. This will help you save space in your bin.</p>\n<p>Remove any plastic from the cardboard before recycling.</p>\n<p>If the item is a takeout box or a pizza box:</p>\n<ul><li>If it’s soiled with food, it can go into compost</li><li>If it’s clean, it can be recycled.</li></ul>',
  },
  paper: {
    name: 'Paper',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Types of paper than can be recycled: office printer paper, newspaper, and magazines, (paper towels go to the landfill)\nPaper for recycling should be clean and not soiled.\nClick the link below for more info.',
    desc_long: '<p>Many different kinds of paper can be recycled, including:</p>\n<ul><li>newspaper</li><li>colored office paper</li><li>white office paper</li><li>magazines</li><li>catalogs</li><li>phone books</li></ul>\n<p>Some type of paper that cannot be recycled are:</p>\n<ul><li>coated and treated paper</li><li>paper with food waste</li><li>juice and cereal boxes</li><li>paper cups</li><li>paper towels</li><li>paper or magazines laminated with plastic</li></ul>',
  },
  glass: {
    name: 'Glass',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Most glass is recyclable, and should be separated from any non-glass part before being placed into the recycling bin.\nFor a list of glass that cannot be recycled, click the link below.',
    desc_long: '<p>Most glass is recyclable.</p>\n<p>Most food and beverage glass containers can be recycled.</p>\n<p>The glass part should be separated from the non-glass part to be recycled. Otherwise it should be sent to landfill.</p>\n<p>The following types of glass <u>cannot</u> be recycled:</p>\n<ul><li>Drinking or wine glasses and plates</li><li>Ceramics, Pyrex or other heat resistant glass</li><li>Light bulbs</li><li>Computer monitors, phone screens</li><li>Plate glass: windows, sliding doors (can be recycled separately)</li><li>Safety glass, car windshields</li><li>Art glass and leaded crystal</li><li>Mirrors</li></ul>',
  },
};

export default categoryData;
