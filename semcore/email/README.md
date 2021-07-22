## Rules

Since Gmail strips the <body> element from incoming emails, it’s necessary to clone it in order to provide a fallback. Generally, a <table> is used, and some styles must be applied to it in order to have it act like a <body> element would:

Some email clients add space below images by default, which is problematic if you’re tiling images. Attach the **.imageFix** class to remove the space. Be aware that, by setting images to block-level elements, you can’t align them without resorting to the float or position CSS properties, which aren’t widely supported:
