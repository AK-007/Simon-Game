var cpuMove=[];
var hard=false;
var interval;
function sss(element)
{
  if(element.getAttribute('aria-pressed')==='false')
    {
      $('.start').attr('onclick','start()');
      $('.strict').attr('onclick','strict()');
      cpuMove=[];
      hard=false;
    }
  if(element.getAttribute('aria-pressed')==='true')
    {
      $('.start').attr('onclick','');
      $('.strict').attr('onclick','');
      $('.display').text('-');
      cpuMove=[];
      hard=false;
    }
}
function start()
{ 
  cpuMove=[Math.floor(Math.random()*4)];
  cputurn();
}
function strict()
{
  hard=true;
  cpuMove=[];
}
function cputurn()
{
  $('.start').click(function(){
    clearInterval(interval);
    start();
  });
  $('.strict').click(function(){
    clearInterval(interval);
    strict();
  });
  $('.toggle').click(function()
                    {
    clearInterval(interval);
    sss(this);
  });
  var counter = cpuMove.length;
  $('.display').text(counter);
  var i = 0;
  interval= setInterval(function(){
    if (counter > 0)
    {
      var element=document.getElementsByClassName(cpuMove[i])[0].id;
      $('#'+element).css('opacity','0.4');
      document.getElementById('myAudio'+cpuMove[i]).play();
      setTimeout(function()
                {
        $('#'+element).css('opacity','1');
      },500);
      counter--;
      i++;
    } 
    else 
    {
      playerturn();
      clearInterval(interval);
    }
  },700);
}
function playerturn()
{
  $('.start').click(function(){
    clearInterval(interval);
    start();
  });
  $('.strict').click(function(){
    clearInterval(interval);
    strict();
  });
  $('.toggle').click(function()
                    {
    clearInterval(interval);
    sss(this);
  });
  var count=cpuMove.length;
  var i=0;
  $('.color').mousedown(function()
                       {
    count--;
    var a=$(this).data('sizing');
    var element=document.getElementsByClassName(a)[0].id;
    $('#'+element).css('opacity','0.4'); document.getElementById('myAudio'+a).play();
    setTimeout(function()
                {
        $('#'+element).css('opacity','1');
      },300);
    if(a!==cpuMove[i])
      {
        $('.color').off();
        $('.display').text('X');
        if(hard)
          {
            setTimeout(start,2000);
          }
        else if(!hard)
          {
            setTimeout(cputurn,1500);
          }
      }
    else if(count===0)
      {
        $('.color').off();
      if(cpuMove.length===20)
        {
          $('.display').text('WIN');
          setTimeout(start,2000);
        }
      else
        {
         cpuMove.push(Math.floor(Math.random()*4));
         setTimeout(cputurn,1500);
        }
      }
    i++;
  });
}