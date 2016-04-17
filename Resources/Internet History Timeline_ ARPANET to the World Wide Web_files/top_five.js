  var top_five = [{"pageviews":18961,"name":"Gladiator Fights Revealed in Ancient Graffiti ","img":"<img src=\"http://i.livescience.com/images/i/000/076/672/i107/graffiti-discovery-1.jpg?1434307132\" alt=\"ancient graffiti\" />","type":"Article","path":"http://www.livescience.com/51203-ancient-graffiti-gladiator-combat-discovered.html"},{"pageviews":17874,"name":"In Photos: Searching for Amelia Earhart","img":"<img src=\"http://i.livescience.com/images/i/000/076/741/i107/amelia-project-2-diver.jpg?1434559665\" alt=\"Diving for wreckage, amelia earhart project\" />","type":"Article","path":"http://www.livescience.com/51246-amelia-earhart-search-photos.html"},{"pageviews":12723,"name":"World's Thinnest Light Bulb Created from Graphene","img":"<img src=\"http://i.livescience.com/images/i/000/076/683/i107/graphene-light-bulb.jpg?1434386939\" alt=\"When a current was run through strips of graphene that were placed across a trench of silicon, the result was light emission.\" />","type":"Article","path":"http://www.livescience.com/51205-graphene-light-bulb-created.html"},{"pageviews":11969,"name":"Real-Life 'Jurassic World' Dinos May Be 10 Years Off, Scientist Says","img":"<img src=\"http://i.livescience.com/images/i/000/076/701/i107/Jurassic-World.JPG?1434404787\" alt=\"Jurassic World\" />","type":"Article","path":"http://www.livescience.com/51219-jurassic-world-real-dinosaur-breeding.html"},{"pageviews":10104,"name":"Earth's Mysteriously Light Core Contains Brimstone","img":"<img src=\"http://i.livescience.com/images/i/000/076/752/i107/earth-layers.jpeg?1434572780\" alt=\"Earth's Layers\" />","type":"Article","path":"http://www.livescience.com/51249-earth-core-contains-brimstone.html"}]
  var rank_max = top_five[0].pageviews

  function get_top_five(){
    articles = ''
    if(top_five){
      articles +='<div class="most_pop_b"><div class="sidebar">';
      articles += '<h3>Most Popular</h3>';
      articles += '';
      for (var asset=0; asset < top_five.length; asset++){
        
        articles += '  <a href="'+ top_five[asset].path +'" style="text-decoration:none;" >';
        articles += '    <div style="float:left; margin-bottom:3px; width:100%;">';
        articles += '      <div style="float:left;">';
        articles += '        '+ top_five[asset].img;
        articles += '      </div>';
        articles += '      <div style="float:right; background-color:#f0f2f3; padding:0 10px;">'
        articles += '        <div style="font-size: 14px; line-height: 16px; width:169px; height:63px; display: table-cell; vertical-align: middle; " ><span style="display:inline-block; max-height:48px; overflow:hidden;" >';
        articles += '          '+ top_five[asset].name.substr(0, 70)+((top_five[asset].name.length > 70) ? '...' : '') ;
        articles += '        </div></span>';
        articles += '      </div>';        
        articles += '      <div style="float:right; width:193px; height:10px; overflow:hidden; background-color:#e5e6e6; ">';
        articles += '          <div style="float:left; width:'+ ((top_five[asset].pageviews/rank_max)*92) +'%; background-color:#faaf3a; height:10px;" ></div>';
        articles += '      </div>';
        articles += '    </div>';
        articles += '  </a>'+"\n";
      }
      articles += '<div style="float:left;width:100%;"></div>';
      articles += '</div></div>';
    }
    return articles
  }
//Mon Jun 22 02:50:45 -0600 2015