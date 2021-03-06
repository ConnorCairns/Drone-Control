define([], function() {
	return function(viewer, input) {
		var bindDoF = function(dof, k1, k2, v) {
			viewer.setKeydownHandler(k1, function() {
				input.changed = true;
				input[dof] = v;
			});
			viewer.setKeyupHandler(k1, function() {
				input.changed = true;
				input[dof] = 0.0;
			});
			viewer.setKeydownHandler(k2, function() {
				input.changed = true;
				input[dof] = -v;
			});
			viewer.setKeyupHandler(k2, function() {
				input.changed = true;
				input[dof] = 0.0;
			});
		}

		viewer.setKeydownHandler('m', function() {
			input.make_waypoint = true;
		});
	}
});
