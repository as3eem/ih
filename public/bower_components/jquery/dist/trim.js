String.prototype.truncateBySent = function(sentCount = 3, moreText = "") {
    //match ".","!","?" - english ending sentence punctuation
    var sentences = this.match(/[^\.!\?]+[\.!\?]+/g);
    if (sentences) {
      console.log(sentences.length);
      if (sentences.length >= sentCount && sentences.length > sentCount) {
        //has enough sentences
        return sentences.slice(0, sentCount).join(" ") + moreText;
      }
    }
    //return full text if nothing else
    return this;
  };
  
  //testing stuff
  var someText =
    "Sample sentence one? Another sentence two. Another three. Is there four? What about five? And six! Finally seven. Eight";
  
  document.querySelector(".full").innerHTML = someText;
  
  
  //how to use it:
  document.querySelector(".preview").innerHTML = someText.truncateBySent(
    2,
    ' <a href="#">View More</a>'
  );
  
  
  //for testing / preview
  var updateTrunc = function() {
    console.log(document.getElementById("showAmount").value);
  
    document.querySelector(".preview").innerHTML = someText.truncateBySent(
      document.getElementById("showAmount").value,' <a href="#">View More</a>'
    );
  };
  