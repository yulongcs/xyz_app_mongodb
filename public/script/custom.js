jQuery(document).ready(function() {

/***************************************************
// Select control
***************************************************/
$(function(){
	var bindEvent = function() {
		$("select").on("change", function(event) {
			var obj = $(this).get(0)
			$(this).parent(".cell-input").find(".select-value").html(obj.options[obj.selectedIndex].text)
		});
	}
	bindEvent();
});
//Select control END

});