$(document).ready(function() {

	$('#add-todo').on('click', function() {

		var content = $('#todo-content').val();

		var todo = $('<li>' +
			'<span>' + content + '</span>' +
			'&nbsp;<button class="btn btn-danger remove-todo">Remove Todo</button>' +
			'&nbsp;<button class="btn btn-success mark-done">Mark as done</button>' +
			'&nbsp;<button class="btn btn-warning mark-pending">Mark as pending</button>' +
			'</li>');

		todo.data('base-color', todo.find('span').css('color'));
		todo.data('base-font', todo.find('span').css('font-weight'));

		$('.todo-list').append(todo);

	})

	$(document).on('click', '.remove-todo', function() {

		$(this).parent().remove();

	})

	$(document).on('click', '.mark-done', function() {

		$(this).parent().find('span').css({
			'color': 'green',
			'font-weight': 'bold'
		});

	})

	$(document).on('click', '.mark-pending', function() {

		$(this).parent().find('span').css({
			'color': $(this).parent().data('base-color'),
			'font-weight': $(this).parent().data('base-font')
		});

	})	

})