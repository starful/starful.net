/* 
 * discovery.js
 * Discovery: The Space Shuttle Orbiter.
 * Version 1.0.0
 * Copyright (C) 2010 Moto Ishizawa.
 */
Discovery = function (wrapper) {
  if (!wrapper.size()) {
    this._error('Wrapper element was not found.');
  }
  this.wrapper = wrapper;
  this.canvas = this._createCanvas();
  this.handler = {};
  this.debug = 0;
};
Discovery.prototype.activate = function (args) {
  var d = this;
  if (!args || !args.video || !args.image || !args.meta) {
    this._error('Arguments error.');
    return 0;
  }
  this.delay = args.delay || 0;
  this.flag = {
    video: 0,
    image: 0,
    prerendering: 0
  };
  this.meta = this._loadMeta(args.meta);
  this.video = this._loadVideo(args.video);
  this.image = this._loadImage(args.image, function () {
    d._prerendering();
  });
  this.wrapper.css({
    position: "relative"
  });
  this.canvas.elem.attr({
    // width: $(this.video).width(),
    // height: $(this.video).height()
    width: 856,
    height: 482
  })
  this.wrapper.append(this.canvas.elem);
};
Discovery.prototype.play = function () {
  var d = this;
  if (!this.flag.image || !this.flag.prerendering) {
    setTimeout(function () {
      d.play();
    }, 500);
    return;
  }
  this.video.currentTime = 0;
  this.video.play();
  if (this.handler.play && typeof this.handler.play == 'function') {
    this.handler.play();
  }
  clearInterval(this.timer);
  this.timer = setInterval(this._rendering(), 1000 / d.meta.pin.meta.fps);
}
Discovery.prototype.stop = function () {
  clearInterval(this.timer);
  this.video.pause();
}
Discovery.prototype.bind = function (type, handler) {
  this.handler[type] = handler;
}
Discovery.prototype._createCanvas = function () {
  var canvas = $('<canvas></canvas>');
  canvas.attr({
    id: 'overlay'
  });
  canvas.css({
    position: 'absolute',
    top: '0',
    left: '0',
    'z-index': '9999'
  });
  return {
    elem: canvas,
    context: canvas.get(0).getContext("2d")
  };
};
Discovery.prototype._loadVideo = function (video) {
  var d = this;
  if (!video || !video.size()) {
    this._error('Video was not specified.');
    return;
  }
  video.bind("loadeddata", function () {
    d.flag.video = 1;
    d._debug('Video loaded.');
  });
  video.bind("ended", function () {
    clearInterval(d.timer);
  });
  return video.get(0);
};
Discovery.prototype._loadImage = function (image, callback) {
  var image, d = this;
  if (!image) {
    this._error('Image was not specified.');
    return;
  }
  image = $('<img src="' + image + '">');
  image.bind('load', function () {
    d.flag.image = 1;
    d._debug('Image loaded.');
    callback();
  });
  return image.get(0);
};
Discovery.prototype._loadMeta = function (meta) {
  var parser;
  if (!meta || !meta.pin || !meta.tracking) {
    this._error('Meta file was not specified.');
    return;
  }
  data = {
    pin: this._fetchFile(meta.pin),
    tracking: this._fetchFile(meta.tracking)
  };
  if (!data.pin || !data.tracking) {
    this._error('Unable to read meta file.');
    return;
  }
  parser = new Discovery.MetaFileParser();
  data.pin = parser.parse_pin(data.pin);
  data.tracking = parser.parse_track(data.tracking);
  return data;
};
Discovery.prototype._fetchFile = (function () {
  $.ajaxSetup({
    async: false
  });
  return function (url) {
    var data;
    $.get(url, function (str) {
      data = str;
    });
    return data;
  }
})();
Discovery.prototype._prerendering = function () {
  var level, image_size, frame, length, loop, d = this;
  this.prerendering = [];
  size = {
    width: this.image.naturalWidth || 150,
    height: this.image.naturalHeight || 150
  };
  frame = 0;
  length = this.meta.pin.point[0].length;
  loop = function () {
    var point = [d.meta.pin.point[0][frame], d.meta.pin.point[1][frame], d.meta.pin.point[2][frame], d.meta.pin.point[3][frame]];
    d.prerendering.push(d._prerender(point, size));
    d._debug("Prerendering frame: " + frame);
    if (++frame < length) {
      setTimeout(loop, 5);
    } else {
      d.flag.prerendering = 1;
    }
  }
  loop();
};
Discovery.prototype._prerender = function (point, size) {
  var stage1 = [],
    stage2 = [],
    level = 1;
  var left_space, total_width, top_width, bottom_width, left_change;
  var left_top, right_top, left_bottom, right_bottom;
  left_space = Math.min(point[0][0], point[2][0]);
  total_width = Math.max(point[1][0], point[3][0]) - left_space;
  top_width = point[1][0] - point[0][0];
  bottom_width = point[3][0] - point[2][0];
  left_change = point[2][0] - point[0][0];
  for (var i = 0; i < size.height; i += level) {
    var before = [0, i, size.width, level];
    var after = [left_change * i / size.height, i, Math.abs((top_width * (size.height - i) + bottom_width * i) / size.height), level];
    stage1.push([before, after]);
  }
  left_top = point[0][1] - (point[1][1] - point[0][1]) * (point[0][0] - left_space) / (point[1][0] - point[0][0]);
  right_top = point[1][1] + (point[1][1] - point[0][1]) * (left_space + total_width - point[1][0]) / (point[1][0] - point[0][0]);
  left_bottom = point[2][1] - (point[3][1] - point[2][1]) * (point[2][0] - left_space) / (point[3][0] - point[2][0]) - left_top;
  right_bottom = point[3][1] + (point[3][1] - point[2][1]) * (left_space + total_width - point[3][0]) / (point[3][0] - point[2][0]) - right_top;
  for (var i = 0; i < total_width; i += level) {
    var before = [i, 0, level, size.height];
    var after = [left_space + i, (left_top * (total_width - i) + right_top * i) / total_width, level, (left_bottom * (total_width - i) + right_bottom * i) / total_width];
    stage2.push([before, after]);
  }
  return {
    width: total_width,
    height: size.height,
    stage1: stage1,
    stage2: stage2
  };
}
Discovery.prototype._rendering = function () {
  var d = this;
  var level = 1;
  var sub_context = document.createElement('CANVAS').getContext('2d');
  return function () {
    var time = d.video.currentTime;
    var frame = parseInt(time * d.meta.pin.meta.fps);
    d.canvas.context.drawImage(d.video, 0, 0);
    if (frame < d.delay) {
      return;
    }
    var prerendering = d.prerendering[frame];
    var point = [d.meta.pin.point[0][frame], d.meta.pin.point[1][frame], d.meta.pin.point[2][frame], d.meta.pin.point[3][frame]];
    sub_context.canvas.setAttribute('width', prerendering.width);
    sub_context.canvas.setAttribute('height', prerendering.height);
    sub_context.clearRect(0, 0, prerendering.width, prerendering.height);
    sub_context.save();
    if (point[2][0] < point[0][0]) {
      sub_context.translate(point[0][0] - point[2][0], 0);
    }
    for (var i = 0; i < prerendering.height; i += level) {
      sub_context.drawImage(d.image, prerendering.stage1[i][0][0], prerendering.stage1[i][0][1], prerendering.stage1[i][0][2], prerendering.stage1[i][0][3], prerendering.stage1[i][1][0], prerendering.stage1[i][1][1], prerendering.stage1[i][1][2], prerendering.stage1[i][1][3]);
    }
    try {
      for (var i = 0; i < prerendering.width; i += level) {
        d.canvas.context.drawImage(sub_context.canvas, prerendering.stage2[i][0][0], prerendering.stage2[i][0][1], prerendering.stage2[i][0][2], prerendering.stage2[i][0][3], prerendering.stage2[i][1][0], prerendering.stage2[i][1][1], prerendering.stage2[i][1][2], prerendering.stage2[i][1][3]);
      }
    } catch (e) {}
    sub_context.restore();
    if (frame >= d.meta.pin.point[0].length - 1) {
      clearInterval(d.timer);
    }
  };
}
Discovery.prototype._error = function (msg) {
  this.debug ? console.log('Debug: ' + msg) : alert('Error: ' + msg);
  console.log(this);
};
Discovery.prototype._debug = function (msg) {
  if (this.debug) {
    console.log('Debug: ' + msg)
  }
};
Discovery.MetaFileParser = function () {
  this.pattern = {
    point: new RegExp(/(\d+)\t([^\t\n]+)\t([^\t\n]+)\t/g),
    common: new RegExp(/(\d+)\t([^\t\n]+)\t([^\t\n]+)\t([^\t\n]+)\t/g),
    rotation: new RegExp(/(\d+)\t([^\t\n\r]+)\t?/g)
  };
};
Discovery.MetaFileParser.prototype.parse_pin = function (str) {
  var pin = {
    meta: this._parse_meta(str),
    point: this._parse_pin_point(str)
  };
  return pin;
};
Discovery.MetaFileParser.prototype._parse_meta = function (str) {
  var meta = {};
  str.match(/Units Per Second\s*([^\s]+)/);
  meta.fps = parseInt(RegExp.$1);
  str.match(/Source Width\s*(\d+)/);
  meta.width = parseInt(RegExp.$1);
  str.match(/Source Height\s*(\d+)/);
  meta.height = parseInt(RegExp.$1);
  str.match(/Source Pixel Aspect Ratio\s*([^\s]+)/);
  meta.source_aspect_ratio = parseInt(RegExp.$1);
  str.match(/Comp Pixel Aspect Ratio\s*([^\s]+)/);
  meta.comp_aspect_ratio = parseInt(RegExp.$1);
  return meta;
};
Discovery.MetaFileParser.prototype._parse_pin_point = function (str) {
  var source, length, point = [];
  source = str.split(/\r?\n\r?\n/).slice(2, -1);
  length = source.length;
  for (var i = 0; i < length; i++) {
    point[i] = [];
    while (line = this.pattern.point.exec(source[i])) {
      for (var j = 2; j <= 4; j++) {
        line[j] = parseInt(line[j]);
      }
      point[i].push(line.slice(2, 4));
    }
  }
  return point;
};
Discovery.MetaFileParser.prototype.parse_track = function (str) {
  var source = str.split(/\r?\n\r?\n/);
  var track = {
    meta: this._parse_meta(str),
    anchor: this._parse_track_common(source[2]),
    position: this._parse_track_common(source[3]),
    scale: this._parse_track_common(source[4]),
    rotation: this._parse_track_rotation(source[5])
  };
  return track;
};
Discovery.MetaFileParser.prototype._parse_track_common = function (str) {
  var data = [];
  while (line = this.pattern.common.exec(str)) {
    for (var i = 2; i <= 5; i++) {
      line[i] = parseInt(line[i]);
    }
    data.push(line.slice(2, 5));
  }
  return data;
};
Discovery.MetaFileParser.prototype._parse_track_rotation = function (str) {
  var rotation = [];
  while (line = this.pattern.rotation.exec(str)) {
    line[2] = parseInt(line[2]);
    line[3] = parseInt(line[3]);
    rotation.push(line.slice(2, 3));
  }
  return rotation;
};