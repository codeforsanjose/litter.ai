const categoryData = {
  plastic: {
    name: 'plastic',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Not all plastic is recyclable, even if you see the chasing arrows sign!\nIf the plastic sign has a number #1 or #2 inside of the chasing arrows, it is most likely recyclable.',
    desc_long: '<p>Not all plastic is recyclable, even if you see the chasing arrows sign!</p>\n<p>If the Plastic sign has a number #1 or #2 inside of the chasing arrows, it is most likely recyclable.</p>\n<p>Sometimes, Plastic #5 is recyclable but check with your zip code to be most certain.</p>\n<p>Most other numbers (i.e. 3, 4, 6, 7) should be sent to landfill.</p>\n<p>To be recycled, plastics should be clean of food/residue.</p>\n<p>Soft plastics like plastic bags or saran wrap should be thrown in the trash.</p>\n<p>Cosmetics should only be recycled if the item is not mixed with metal, and if the cosmetic portion is removed.</p>',
  },
  metal: {
    name: 'metal',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Most types of metal are recyclable!\nAluminum/tin cans are recyclable.  Rinsing/washing them first will help their recyclability and keep your kitchen smelling fresh.\nMixed items (combination metal, plastic, or glass) should be separated into their component parts.\n',
    desc_long: '<p>Most types of metal are recyclable!</p>\n<p>Aluminum/tin cans are recyclable.  Rinsing/washing them first will help their recyclability and keep your kitchen smelling fresh.</p>\n<p>Mixed items (combination metal, plastic, or glass) should be separated into their component parts.</p>',
  },
  cardboard: {
    name: 'cardboard',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Most cardboard is recyclable.  Break cardboard down so it lays flat to save space in your bin.\nRemove any plastic from the cardboard.  If soiled (with food), it can go into compost.',
    desc_long: '<p>Cardboard is one of the easiest and most common materials to recycle!</p>\n<p>It’s best to break down cardboard so that it lays flat. This will help you save space in your bin.</p>\n<p>Remove any plastic from the cardboard before recycling.</p>\n<p>If the item is a takeout box or a pizza box:</p>\n<ul><li>If it’s soiled with food, it can go into compost</li><li>If it’s clean, it can be recycled.</li></ul>',
  },
  paper: {
    name: 'paper',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Types of paper than can be recycled: office printer paper, newspaper, and magazines, (paper towels go to the landfill)\nPaper for recycling should be clean and not soiled.\nClick the link below for more info.',
    desc_long: '<p>Many different kinds of paper can be recycled, including:</p>\n<ul><li>newspaper</li><li>colored office paper</li><li>white office paper</li><li>magazines</li><li>catalogs</li><li>phone books</li></ul>\n<p>Some type of paper that cannot be recycled are:</p>\n<ul><li>coated and treated paper</li><li>paper with food waste</li><li>juice and cereal boxes</li><li>paper cups</li><li>paper towels</li><li>paper or magazines laminated with plastic</li></ul>',
  },
  glass: {
    name: 'glass',
    category: 'Recycle',
    icon: '',
    alt: 'recycle icon',
    description: 'Most glass is recyclable, and should be separated from any non-glass part before being placed into the recycling bin.\nFor a list of glass that cannot be recycled, click the link below.',
    desc_long: '<p>Most glass is recyclable.</p>\n<p>Most food and beverage glass containers can be recycled.</p>\n<p>The glass part should be separated from the non-glass part to be recycled. Otherwise it should be sent to landfill.</p>\n<p>The following types of glass <u>cannot</u> be recycled:</p>\n<ul><li>Drinking or wine glasses and plates</li><li>Ceramics, Pyrex or other heat resistant glass</li><li>Light bulbs</li><li>Computer monitors, phone screens</li><li>Plate glass: windows, sliding doors (can be recycled separately)</li><li>Safety glass, car windshields</li><li>Art glass and leaded crystal</li><li>Mirrors</li></ul>',
  },
  compost: {
    name: 'compost',
    category: 'Compost',
    icon: '',
    alt: 'compost icon',
    description: 'In general, organic material from the kitchen or yard can be composted.  Please use a compost bag, not a plastic bag when composting.\nFor a longer list of what can and cannot be composted, click the link below.',
    desc_long: '<p>In general, organic material from the kitchen or yard can be composted.  Please use a compost bag, not a plastic bag when composting.  Here’s a list:</p>\n<h1><b>Compostable</b></h1>\n<p>Food waste from the kitchen</p>\n<ul><li>Leftovers</li><li>Trimmings (i.e banana peels)</li><li>Coffee grounds</li></ul><p>Food soiled paper</p>\n<ul><li>Coffee filters</li><li>Soiled pizza boxes</li><li>Paper bags, napkins</li><li>Be sure to remove metal or plastic from the paper</li></ul><p>Plants</p>\n<ul><li>Yard trimmings</li><li>Fallen leaves</li></ul><p>Other</p>\n<ul><li>Cotton balls</li><li>fur/hair</li><li>Wood, cork</li></ul><h1><b>Not compostable</b></h1>\n<ul><li>Aluminum foil</li><li>“Biodegradable” plastic</li><li>Cooking oil</li><li>Animal (cat/dog) droppings</li><li>Ceramic/glass dishware</li><li>Clothing</li></ul>',
  },
  trash: {
    name: 'landfill',
    category: 'Trash',
    icon: '',
    alt: 'landfill icon',
    description: 'Household items that cannot be recycled or composted should go into the landfill bin.',
    desc_long: '<p>Most household items that can’t be recycled or composted should go into the landfill bin.</p>\n<p>Some common items include:</p><ul><li>Plastic that isn’t #1, #2 or #5</li><li>Soiled plastic takeout</li><li>Ceramics</li><li>Light bulbs</li><li>Mixed plastic, metal, and glass that can’t be separated.</li></ul><p>Some items that should be disposed separately from the landfill, recycling, or compost include:</p><li>Batteries</li><li>E-waste</li><li>Large objects like furniture or mattresses</li><li>Cooking oil</li></ul>',
  },
  other: {
    name: 'other',
    category: 'Unknown',
    icon: '',
    alt: 'landfill icon',
    description: 'We recommend that you look up your local waste management service to learn how to properly dispose of these items.',
    desc_long: '<p>Some items that should be disposed separately from the landfill, recycling, or compost, such as:</p><ul><li>Batteries</li><li>E-waste such as computers or printers</li><li>Large objects like furniture or mattresses</li><li>Large sporting equipment such as bicycles</li><li>Cooking oil</li><li>Tires</li><li>Deceased animals</li></ul><p>We recommend that you look up your local waste management service to learn how to properly dispose of these items.</p>',
  },
  unknown: {
    name: 'unknown',
    category: 'Unknown',
    icon: '',
    alt: 'landfill icon',
    description: 'Some items are just hard to classify!  If you’re unsure of how to sort this item, click the link below for general guidelines.',
    desc_long: '<h1>Recyclable:</h1>\n <ul><li>#1, #2 plastic</li><ul><li>Should be clean without food or other contamination</li></ul></ul><ul><li>Most metal</li><ul><li>Aluminum or tin cans, water bottles</li><li>Should be clean without food or other contamination</li></ul></ul><ul><li>Cardboard and clean paper</li><ul><li>Should be clean without food or other contamination</li><li>Cardboard boxes, white copy paper, colored paper, newspapers, magazine</li></ul></ul><ul><li>Glass</li><ul><li>Glass jars and bottles</li></ul></ul><p>Recyclable materials should not be mixed with other materials such as metal (i.e. some cosmetics casing)--these go to landfill.</p>\n<h1>Not Recyclable</h1><ul><li>Soft plastics like bags or saran wrap</li><li>Plastics such as: #3, #4, #6, or #7</li><li>Material contaminated with lots of food</li><li>Ceramic dishware</li><li>Mixed material objects with an inseparable combination of plastic, metal, and glass such as some cosmetic casings and juice boxes</li></ul><h1>Compostable</h1>\n<ul><li>Food waste from the kitchen</li><li>Food soiled paper</li><li>Plants</li></ul><h1>Not compostable</h1>\n<ul><li>Aluminum foil</li><li>“Biodegradable” plastic</li><li>Cooking oil</li><li>Animal (cat/dog) droppings</li></ul><h1>Landfill</h1>\n<p>Most household items that can’t be recycled or composted should go into the landfill bin.</p><p>Some common items include:</p><ul><li>Plastic that isn’t #1, #2 or #5</li>Soiled plastic takeout</li><li>Ceramic such as coffee mugs or dishware</li><li>Light bulbs</li><li>Mixed plastic, metal, and glass itemsthat can’t be separated.</li></ul><h1>Other</h1>\n<p>Some items that should be disposed separately from the landfill, recycling, or compost, such as:</p><ul><li>Batteries</li><li>E-waste such as computers or printers</li><li>Large objects like furniture or bicycles</li></ul>',
  },
};

export default categoryData;