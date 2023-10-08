/**
 * WordPress dependencies
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

/**
 * Internal dependencies
 */
import TermUtils from '../utils/term-utils';

test.use( {
	termUtils: async ( { requestUtils }, use ) => {
		await use( new TermUtils( { requestUtils } ) );
	},
} );

test.describe( 'Media library filter', () => {
	let categories;
	let tags;

	test.beforeAll( async ( { termUtils } ) => {
		categories = {};
		categories['Test Category 1'] = await termUtils.createAttachmentCategory( { name: 'Test Category 1' } );
		categories['Test Category 2'] = await termUtils.createAttachmentCategory( { name: 'Test Category 2' } );

		tags = {};
		tags['Test Tag 1'] = await termUtils.createAttachmentTag( { name: 'Test Tag 1' } );
	} );

	test.afterAll( async ( { termUtils } ) => {
		await termUtils.deleteAllAttachmentCategories();
		await termUtils.deleteAllAttachmentTags();
		categories = undefined;
		tags = undefined;
	} );

	test( 'Media library filter dropdowns are present with terms', async ( {
		page,
		admin,
	} ) => {
		await admin.visitAdminPage( 'upload.php' );

		const categoryFilters = page.locator( '#media-attachment-attachment-category-filters' );
		await expect( categoryFilters ).toBeVisible();
		await expect( categoryFilters.locator( 'option' ) ).toHaveCount( 3 ); // 2 categories, plus 'all'.

		const tagFilters = page.locator( '#media-attachment-attachment-tag-filters' );
		await expect( tagFilters ).toBeVisible();
		await expect( tagFilters.locator( 'option' ) ).toHaveCount( 2 ); // 1 tag, plus 'all'.
	} );
} );
