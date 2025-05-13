export class ApiSuccess {
  constructor(message, data = null, statusCode = 200) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Başarı durumu için yanıt döndürür
   * @param {string} message - Başarı mesajı
   * @param {object} data - Döndürülecek veri (opsiyonel)
   * @param {number} statusCode - HTTP statü kodu (opsiyonel)
   */
  static response(message, data = null, statusCode = 200) {
    return new ApiSuccess(message, data, statusCode);
  }
}
