define(["backbone"], function(backbone) {
	var b = Backbone.View.extend({
		render: function() {
			this.$el.html("<table><tr><td>Dummy</td><td><b>Table</b></td></tr></table");
			return this;
		}
	});
	return new b();
});