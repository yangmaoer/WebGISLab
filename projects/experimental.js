olapp.project.load(function (project) {
  var resolutionFromZoomLevel = olapp.tools.projection.resolutionFromZoomLevel;

  // GSI tiles
  // http://maps.gsi.go.jp/development/
  var layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions: [
        new ol.Attribution({
          html: "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        })
      ],
      projection: 'EPSG:3857',
      tileGrid: ol.tilegrid.createXYZ({
        minZoom: 2,
        maxZoom: 18
      }),
      url: 'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'
    })
  });
  layer.title = '地理院地図 (標準地図)';
  project.addLayer(layer);

  layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions: [
        new ol.Attribution({
          html: "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        })
      ],
      projection: 'EPSG:3857',
      tileGrid: ol.tilegrid.createXYZ({
        minZoom: 5,
        maxZoom: 15
      }),
      url: 'http://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png'
    }),
    maxResolution: resolutionFromZoomLevel(5 - 0.1)
  });
  layer.setVisible(false);
  layer.title = '色別標高図';
  project.addLayer(layer);

  layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions: [
        new ol.Attribution({
          html: "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        })
      ],
      projection: 'EPSG:3857',
      tileGrid: ol.tilegrid.createXYZ({
        minZoom: 2,
        maxZoom: 18
      }),
      url: 'http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'
    })
  });
  layer.setVisible(false);
  layer.title = '写真';
  project.addLayer(layer);

  // EXPERIMENTAL vector tile - experimental_rdcl
  layer = new ol.layer.Vector({
    source: new ol.source.TileVector({
      attributions: [
        new ol.Attribution({
          html: "<a href='https://github.com/gsi-cyberjapan/vector-tile-experiment' target='_blank'>地理院提供実験(rdcl)</a>"
        })
      ],
      format: new ol.format.GeoJSON({defaultProjection: 'EPSG:4326'}),
      projection: 'EPSG:3857',
      tileGrid: ol.tilegrid.createXYZ({
        minZoom: 16,
        maxZoom: 16
      }),
      url: 'http://cyberjapandata.gsi.go.jp/xyz/experimental_rdcl/{z}/{x}/{y}.geojson'
    }),
    style: function(feature, resolution) {
      return [new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'orange', 
          width: 4
        })
      })];
    },
    maxResolution: resolutionFromZoomLevel(16 - 0.1)
  });
  layer.setVisible(false);
  layer.title = '道路中心線 (z>=16)';
  project.addLayer(layer);

  // EXPERIMENTAL vector tile - experimental_fgd
  layer = new ol.layer.Vector({
    source: new ol.source.TileVector({
      attributions: [
        new ol.Attribution({
          html: "<a href='https://github.com/gsi-cyberjapan/experimental_fgd' target='_blank'>地理院提供実験(fgd)</a>"
        })
      ],
      format: new ol.format.GeoJSON({defaultProjection: 'EPSG:4326'}),
      projection: 'EPSG:3857',
      tileGrid: ol.tilegrid.createXYZ({
        minZoom: 18,
        maxZoom: 18
      }),
      url: 'http://cyberjapandata.gsi.go.jp/xyz/experimental_fgd/{z}/{x}/{y}.geojson'
    }),
    style: olapp.core.styleFunction,
    maxResolution: resolutionFromZoomLevel(18 - 0.1)
  });
  layer.setVisible(false);
  layer.title = '基盤地図情報（基本項目）(z>=18)';
  project.addLayer(layer);

  // EXPERIMENTAL GSI elevation tile
  layer = new ol.layer.Tile({
    source: new ol.source.XYZElevCSV({
      attributions: [
        new ol.Attribution({
          html: "<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        })
      ],
      projection: 'EPSG:3857',
      tileGrid: ol.tilegrid.createXYZ({
        minZoom: 0,
        maxZoom: 14
      }),
      url: 'http://cyberjapandata.gsi.go.jp/xyz/dem/{z}/{x}/{y}.txt'
    })
  });
  layer.setVisible(false);
  layer.title = '段彩図 (標高タイル)';
  project.addLayer(layer);
});