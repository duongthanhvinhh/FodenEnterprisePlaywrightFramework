import { ok } from 'assert';
import { test, expect } from '../../fixtures/hooks-fixture'
import routesData from '../../data/api-data/routes-data.json'
import restfulBookerData from '../../data/api-data/restful-booker-module-data.json'

/**
 * TC1: [BOOKING] - Verify user is able to create new booking using post API
 * TC2: [BOOKING] - Verify user is able to update existing booking using put API
 * TC3: [BOOKING] - Verify user is able to partially update existing booking using patch API
 * TC4: [BOOKING] - Verify user is able to delete existing booking using delete API
 * TC5: [BOOKING] - Verify user is able to fetch a booking details by Id using get API
 * TC6: [BOOKING] - Verify user is able to fetch all booking Ids using get API
 */

test('[BOOKING] - Verify user is able to fetch all booking Ids using get API', {
    tag: ['@API', '@UAT', '@DEV'],
    annotation: {
        type: 'Work Item Link',
        description: 'Link to your work item'
    }
}, async ({ request }) => {
    const bookingIdsResp = await request.get(routesData.booking_path);
    expect(bookingIdsResp.status()).toBe(200);
    expect(bookingIdsResp.statusText()).toBe('OK');
    expect(bookingIdsResp.headers()['content-type']).toBe(restfulBookerData.content_type);
    const bookingIdsJsonResp = await bookingIdsResp.json();
    expect(bookingIdsJsonResp).not.toBeNull();
})

test('[BOOKING] - Verify user is able to fetch a booking details by Id using get API', {
    tag: ['@API', '@UAT', '@DEV'],
    annotation: {
        type: 'Work Item Link',
        description: 'Link to your work item'
    }
}, async ({ request }) => {
    const bookingResp = await request.get(`${routesData.booking_path}/${restfulBookerData.booking_id}`);
    expect(bookingResp.status()).toBe(200);
    expect(bookingResp.statusText()).toBe('OK');
    const bookingJsonResp = await bookingResp.json();
    expect(bookingJsonResp).not.toBeNull();
    expect(bookingJsonResp.firstname).toEqual(restfulBookerData.first_name);

})

test('[BOOKING] - Verify user is able to create new booking using post API', {
    tag: ['@API', '@UAT', '@DEV'],
    annotation: {
        type: 'Work Item Link',
        description: 'Link to your work item'
    }
}, async ({ request }) => {
    const addBookingResp = await request.post(routesData.booking_path, {
        data: restfulBookerData.create_booking
    });
    expect(addBookingResp.status()).toBe(200);
    expect(addBookingResp.statusText()).toBe('OK');
    expect(addBookingResp.headers()['content-type']).toBe(restfulBookerData.content_type);
    const addBookingJsonResp = await addBookingResp.json();
    expect(addBookingJsonResp).not.toBeNull();
    expect(addBookingJsonResp.booking).toMatchObject(restfulBookerData.create_booking);
})

test('[BOOKING] - Verify user is able to update an existing booking using put API', {
    tag: ['@API', '@UAT', '@DEV'],
    annotation: {
        type: 'Work Item Link',
        description: 'Link to your work item'
    }
}, async ({request, commonApiUtils}) => {
    const updateBookingResp = await request.put(`${routesData.booking_path}/${restfulBookerData.booking_id2}`, {
        headers: {
            Cookie: `token=${await commonApiUtils.createToken()}`
        },
        data: restfulBookerData.update_booking
    });
    expect(updateBookingResp.status()).toBe(200);
    const updateBookingJsonResp = await updateBookingResp.json();
    expect(updateBookingJsonResp).toMatchObject(restfulBookerData.update_booking);
})

test('[BOOKING] - Verify user is able to partially update an existing booking using patch API', {
    tag: ['@API', '@UAT', '@DEV'],
    annotation: {
        type: 'Work Item Link',
        description: 'Link to your work item'
    }
}, async ({request, commonApiUtils})=> {
    const partiallyUpdateBookingResp = await request.patch(`${routesData.booking_path}/${restfulBookerData.booking_id3}`, {
        headers: {
            Cookie: `token=${await commonApiUtils.createToken()}`
        },
        data: restfulBookerData.partially_update_booking
    });
    expect(partiallyUpdateBookingResp.status()).toBe(200);
    const partiallyUpdateBookingJsonResp = await partiallyUpdateBookingResp.json();
    expect(partiallyUpdateBookingJsonResp).toMatchObject(restfulBookerData.partially_update_booking);
    expect(partiallyUpdateBookingJsonResp.bookingdates.checkin).toMatch(restfulBookerData.partially_update_booking.bookingdates.checkin);
    expect(partiallyUpdateBookingJsonResp.bookingdates.checkout).toMatch(restfulBookerData.partially_update_booking.bookingdates.checkout);
})

test('[BOOKING] - Verify user is able to delete an existing booking using delete API', {
    tag: ['@API', '@UAT', '@DEV'],
    annotation: {
        type: 'Work Item Link',
        description: 'Link to your work item'
    }
}, async ({ request, commonApiUtils }) => {
    //Add a new booking and get booking Id to use in the delete request
    const addBookingResp = await request.post(routesData.booking_path, {
        data: restfulBookerData.create_booking
    });
    expect(addBookingResp.status()).toBe(200);
    expect(addBookingResp.statusText()).toBe('OK');
    expect(addBookingResp.headers()['content-type']).toBe(restfulBookerData.content_type);
    const addBookingJsonResp = await addBookingResp.json();
    expect(addBookingJsonResp).not.toBeNull();
    expect(addBookingJsonResp.booking).toMatchObject(restfulBookerData.create_booking);
    const bookingId = addBookingJsonResp.bookingid;

    //Delete the booking using bookingId just created
    const deleteBookingResp = await request.delete(`${routesData.booking_path}/${bookingId}`, {
        headers: {
            Cookie: `token=${await commonApiUtils.createToken()}`
        }
    });
    expect(deleteBookingResp.status()).toBe(201);
    expect(deleteBookingResp.statusText()).toBe('Created');

    //Get the booking that we just deleted and make sure api response is 404 Not Found
    const getBookingResp = await request.get(`${routesData.booking_path}/${bookingId}`);
    expect(getBookingResp.status()).toBe(404);
    expect(getBookingResp.statusText()).toBe('Not Found');
})