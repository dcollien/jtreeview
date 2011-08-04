/**
 * jtreeview
 * Dirt simple sliding nested list jQuery plugin
 * (c) 2011 David Collien
 */
(function( $ ){
	var pluginName = 'jtreeview';

	$.fn[pluginName] = function( method ) {
		
		var treeviewify = function( elt ) {
			// add sliding functionality to a HTML nested list
			elt.addClass( pluginName );
			var items = elt.find( 'li' );
			
			items.addClass( pluginName + '_item' );
			
			items.each( function( ) {
				var $item = $(this);
				
				var $subTree = $item.children( 'ul' );
				if ( $subTree.length == 0 ) {
					$item.addClass( pluginName + '_leaf' );
				} else {
					$subTree.addClass( pluginName + '_subtree' );
				}
			} );
			
			items.click( function( event ) {
				if ( event.target == this ) {
					// only act upon clicking the top-level li data
					$(this).children( 'ul' ).slideToggle( 'fast' );
					$(this).toggleClass( pluginName + '_item_closed' );
				}
			} );
		};
		
		var buildJSONTree = function( elt, data ) {
			console.log( elt );
			console.log( data );
			for ( var i = 0; i < data.length; i++ ) {
				var item = data[i];
				
				var $item = $('<li></li>');
				
				if ( item.id ) {
					$item.attr( 'id', item.id );
				}
				if ( item.className ) {
					$item.addClass( item.className );
				}
				if ( item.content ) {
					$item.html( item.content );
				}
				
				console.log( $item );
				
				elt.append( $item );
				
				if ( item.children ) {
					$subtree = $('<ul></ul>');
					$item.append( $subtree );
					buildJSONTree( $subtree, item.children );
				}
			}
		};
	
		var methods = {
			init : function( user_options ) {
				// default settings
				var settings = {
					
				};
		
				// extend the defaults with any provided options
				if ( user_options ) {
					$.extend( settings, user_options );
				}
				
				console.log( this );
				// update with any given data
				return methods.update.call( this, settings.data );
			},
			update : function( data ) {
				return this.each( function( ) {
					var elt = $(this);
					
					if ( elt.is( 'ul' ) ) {
						if ( data ) {
							elt.empty( );
							buildJSONTree( elt, data );
						}
						
						treeviewify( elt );
					} else {
						$.error( pluginName + ' can only be built on <ul> elements' );
					}
				} );
			}
		};
		
		
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on ' + pluginName );
		}  
	};
})( jQuery );