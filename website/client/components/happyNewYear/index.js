import './index.css';

let christmas = {
  delay: null,
  delete: function() {
    document.body.querySelectorAll('.christmas-lights').forEach(function(ul) {
      ul.remove();
    });
  },
  create: function() {
    let v = window.innerHeight / 60 + 2,
      h = window.innerWidth / 60 + 2,
      data = {
        // 'top': h,
        // 'right': v,
        bottom: h,
        // 'left': v,
      };
    for (let position in data) {
      let c = data[position];
      let ul = document.createElement('ul');
      ul.className = 'christmas-lights';
      ul.dataset.position = position;
      for (let i = 0; i <= c; i++) {
        ul.append(document.createElement('li'));
      }
      document.body.append(ul);
    }
  },
};

document.addEventListener('DOMContentLoaded', function() {
  christmas.create();
});

window.addEventListener('resize', function(e) {
  clearTimeout(christmas.delay);
  christmas.delay = setTimeout(function() {
    christmas.delete();
    christmas.create();
  }, 100);
});
