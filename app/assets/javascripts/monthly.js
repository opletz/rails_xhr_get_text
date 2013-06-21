window.onload = function(){
  var a = document.getElementById('monthly');
  var tgtTag = document.getElementById('tgtTag');
   
  a.addEventListener('click', function(e){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'products/monthly');
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status === 200){
        tgtTag.innerHTML = xhr.responseText;
      }
    };
    e.preventDefault();
    xhr.send(null);
  });
};
