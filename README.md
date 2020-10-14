## ScreenTime Server README

### Description

[Deployed Client link](https://screentime-client.herokuapp.com/)

[Deployed Server link](https://screentime-server.herokuapp.com/)

ScreenTime is an app where you can log reviews of any movies or TV shows that you have watched. In v1, after creating an account you enter basic information about the movie or show (title, among other info) and can add your own rating from 0-10 and a review. Once logged, you can go back to amend your score or review as desired, but not the basic info about the piece of media. Should you wish, you can also delete your reviews.

### Features

1. Creating an account to store your reviews
2. Log reviews by entering basic info about movie (title, director, year released are required; runtime optional) or TV show (title, network required; number of seasons optional) and add your score and review.
3. Once logged, you can edit or delete your review/score. In updating, the basic info is already locked in.

### Endpoints

URL/user

1. /register --- POST - create a user account

2. /login --- POST - login to a user account

URL/movie

1. /review --- POST - create a review

2. / --- GET - get your personal reviews

3. /review/:id --- PUT - update your score or review, but not the title and other identifying info for that piece of media

4. /review/:id --- DELETE - delete a review (can be done by either the user that created or the admin)

5. /all --- GET - Admin can get all users' reviews

URL/tv

1. /review --- POST - create a review

2. / --- GET - get your personal reviews

3. /review/:id --- PUT - update your score or review, but not the title and other identifying info for that piece of media

4. /review/:id --- DELETE - delete a review (can be done by either the user that created or the admin)

5. /all --- GET - Admin can get all users' reviews

### Outputs

URL/user

## 1. User Register

![User Register](/assets/user-register.png)

<br/>

## 2. User Login

![User Login](/assets/user-login.png)

<br/>

URL/movie

## 1. Post a Movie Review

![Movie POST](/assets/movie-create-review.png)

<br/>

## 2. Edit a Movie Review

![Movie PUT](/assets/movie-update-review.png)

<br/>

## 3. Get User's Movie Reviews

![Movie GET](/assets/movie-get-users-reviews.png)

<br/>

## 4. Delete a Movie Review

![Movie DELETE](/assets/movie-delete-review.png)

<br/>

URL/tv

## 1. Post a TV Review

![TV POST](/assets/tv-create-review.png)

<br/>

## 2. Edit a TV Review

![TV PUT](/assets/tv-update-review.png)

<br/>

## 3. Get User's TV Reviews

![TV GET](/assets/tv-get-users-reviews.png)

<br/>

## 4. Delete a TV Review

![TV DELETE](/assets/tv-delete-review.png)