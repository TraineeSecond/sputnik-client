import {Button} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';

import {useUserStore} from 'entities/user';
import {Point, useMapStore} from 'features/MapInfo/model/store';
import {StarIcon} from 'shared/icons';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useCartStore} from 'shared/stores/CartStore';

import {useReviewsPointsStore} from '../model/store';
import {ReviewsPointsStyles as styles} from './ReviewsPoints.styles';

export const ReviewsPoints = () => {
  const {points, makeReview, fetchPoints} = useMapStore();
  const {selectedPoint, setSelectedPoint, clearSelectedPoint} = useCartStore();
  const {user} = useUserStore();
  const {userRating, isModalVisible, setUserRating, setIsModalVisible} =
    useReviewsPointsStore();

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleOpenModal = (point: Point) => {
    setSelectedPoint(point);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    clearSelectedPoint();
    setIsModalVisible(false);
    setUserRating(0);
  };

  const handleStarPress = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitReview = async () => {
    if (selectedPoint) {
      await makeReview(user.id, selectedPoint.id, userRating);
      handleCloseModal();
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const handleOnPress = () => handleStarPress(i);
      stars.push(
        <TouchableOpacity key={i} onPress={handleOnPress}>
          <StarIcon
            fill={i <= userRating ? Colors.Yellow500 : Colors.Gray500}
            width={50}
            height={50}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.h3.changeColor(Colors.Black100), styles.title]}>
        Отзывы пунктов выдачи заказов
      </Text>
      <View>
        {points.map(point => {
          const handleModal = () => handleOpenModal(point);
          return (
            <TouchableOpacity
              key={point.id}
              onPress={handleModal}
              style={styles.pointContainer}>
              <Text
                style={[
                  TextStyles.p1.changeColor(Colors.Black200),
                  styles.pointName,
                ]}>
                {point.name}
              </Text>
              <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
                Рейтинг: {point.rating.toFixed(2)} ({point.reviewCount} отзывов)
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text
                style={[
                  TextStyles.p3.changeColor(Colors.Black100),
                  styles.title,
                ]}>
                Оцените пункт выдачи
              </Text>
              <View style={styles.starsContainer}>{renderStars()}</View>
              <Button
                status="warning"
                style={styles.submitButton}
                onPress={handleSubmitReview}>
                <Text style={TextStyles.p3.changeColor(Colors.White100)}>
                  Отправить отзыв
                </Text>
              </Button>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}>
                <Text style={TextStyles.p3.changeColor(Colors.Gray500)}>
                  Закрыть
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
