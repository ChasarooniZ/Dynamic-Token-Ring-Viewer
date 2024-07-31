document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('update-json').addEventListener('click', updateVisualization);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();
let jsonData = {

  "config": {
    "defaultColorBand": {
      "startRadius": 0.59,
      "endRadius": 0.7225
    }
  },

  "frames": {

    "token-ring-gargantuan-bkg": {
      "frame": {
        "x": 0,
        "y": 0,
        "w": 2048,
        "h": 2048
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 2048,
        "h": 2048
      },
      "sourceSize": {
        "w": 2048,
        "h": 2048
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      }
    },
    "token-ring-gargantuan": {
      "frame": {
        "x": 2048,
        "y": 0,
        "w": 2048,
        "h": 2048
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 2048,
        "h": 2048
      },
      "sourceSize": {
        "w": 2048,
        "h": 2048
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      },
      "gridTarget": 3
    },
    "token-ring-large-huge-bkg": {
      "frame": {
        "x": 0,
        "y": 2048,
        "w": 1024,
        "h": 1024
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 1024,
        "h": 1024
      },
      "sourceSize": {
        "w": 1024,
        "h": 1024
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      }
    },
    "token-ring-large-huge": {
      "frame": {
        "x": 1024,
        "y": 2048,
        "w": 1024,
        "h": 1024
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 1024,
        "h": 1024
      },
      "sourceSize": {
        "w": 1024,
        "h": 1024
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      },
      "gridTarget": 2
    },
    "token-ring-med-bkg": {
      "frame": {
        "x": 2048,
        "y": 2048,
        "w": 512,
        "h": 512
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 512,
        "h": 512
      },
      "sourceSize": {
        "w": 512,
        "h": 512
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      }
    },
    "token-ring-med": {
      "frame": {
        "x": 2560,
        "y": 2048,
        "w": 512,
        "h": 512
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 512,
        "h": 512
      },
      "sourceSize": {
        "w": 512,
        "h": 512
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      },
      "gridTarget": 1
    },
    "token-ring-tiny-bkg": {
      "frame": {
        "x": 3072,
        "y": 2048,
        "w": 256,
        "h": 256
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 256,
        "h": 256
      },
      "sourceSize": {
        "w": 256,
        "h": 256
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      }
    },
    "token-ring-tiny": {
      "frame": {
        "x": 3328,
        "y": 2048,
        "w": 256,
        "h": 256
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 256,
        "h": 256
      },
      "sourceSize": {
        "w": 256,
        "h": 256
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      },
      "gridTarget": 0.5
    }
  },
  "meta": {
    "app": "https://www.codeandweb.com/texturepacker",
    "version": "1.1",
    "image": "rings-steel.webp",
    "format": "RGBA8888",
    "size": {
      "w": 4096,
      "h": 4096
    },
    "scale": "1",
    "smartupdate": "$TexturePacker:SmartUpdate:496ccb17f5931d97cd7c0c3a3e12d174:df2ec9802471032573442880ef1b4096:ec3138cf13d5faeeb3b426f1b12635be$"
  }
};

document.getElementById('json-input').value = JSON.stringify(jsonData, null, 2);

function handleImageUpload(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    img.src = e.target.result;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      drawVisualization();
    };
  };
  reader.readAsDataURL(event.target.files[0]);
}

function drawVisualization() {
  ctx.drawImage(img, 0, 0);
  // Draw frames
  for (const key in jsonData.frames) {
    if (jsonData.frames.hasOwnProperty(key)) {
      const frame = jsonData.frames[key].frame;
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
    }
  }
}

function updateVisualization() {
  try {
    jsonData = JSON.parse(document.getElementById('json-input').value);
    drawVisualization();
  } catch (e) {
    alert('Invalid JSON');
  }
}
