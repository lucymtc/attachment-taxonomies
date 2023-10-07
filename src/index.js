/**
 * Internal dependencies
 */
import {
	createAttachmentTaxonomyFilter,
	extendAttachmentsBrowser,
} from './utils';

/**
 * Initializes the JS logic to extend the WordPress media library.
 *
 * @param {Object} wpMedia    See `wp.media`.
 * @param {Object} $          Reference to jQuery.
 * @param {Object} taxonomies Taxonomies data passed from PHP.
 */
function extendMediaLibrary( wpMedia, $, taxonomies ) {
	wpMedia.view.AttachmentFilters.Taxonomy = createAttachmentTaxonomyFilter(
		wpMedia.view.AttachmentFilters
	);
	wpMedia.view.AttachmentsBrowser = extendAttachmentsBrowser(
		wpMedia.view.AttachmentsBrowser,
		wpMedia.view.AttachmentFilters.Taxonomy,
		wpMedia.view.Label,
		taxonomies
	);

	$( document ).on(
		'change',
		'.attachment-taxonomy-select > select',
		function ( e ) {
			const options = [];
			for ( const i in e.target.options ) {
				if ( e.target.options[ i ].selected ) {
					options.push( e.target.options[ i ].value );
				}
			}

			$( e.target )
				.parent()
				.prev( '.attachment-taxonomy-input' )
				.find( 'input' )
				.val( options.join( ',' ) )
				.trigger( 'change' );
		}
	);
}

window._attachmentTaxonomiesExtendMediaLibrary = extendMediaLibrary;
