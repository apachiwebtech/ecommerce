app.post('/nodeapp/inquirydiscuss_update', async (req, res) => {
  try {
    const { u_id } = req.body;

    // Input validation
    if (!u_id) {
      return res.status(400).json({
        success: false,
        message: 'Discussion ID is required',
        error: 'INVALID_INPUT'
      });
    }

    // Sanitize input to prevent SQL injection
    const sanitizedId = parseInt(u_id);
    if (isNaN(sanitizedId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid discussion ID format',
        error: 'INVALID_ID_FORMAT'
      });
    }

    const sql = "SELECT * FROM awt_inquirydiscussion WHERE id = ? AND deleted = 0";

    con.query(sql, [sanitizedId], (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: 'DATABASE_ERROR'
        });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Discussion not found',
          error: 'NOT_FOUND'
        });
      }

      return res.status(200).json({
        success: true,
        data: data[0],
        message: 'Discussion retrieved successfully'
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'SERVER_ERROR'
    });
  }
}); 