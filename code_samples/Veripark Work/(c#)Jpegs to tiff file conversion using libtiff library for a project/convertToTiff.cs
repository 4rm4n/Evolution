/// <summary>
/// Converts an array of .jpeg encoded binary streams into a .tiff stream and returns the stream
/// </summary>
/// <param name="images">Array of images that are encoded in JPEG format</param>
/// <returns>Composed TIFF images a single stream</returns>
private byte[] ConvertToTiff(IList<Stream> jpegList)
{
    if (jpegList != null && jpegList.Count > 0)
    {
        try
        {
            string startupPath = (new Uri(Assembly.GetExecutingAssembly().CodeBase)).AbsolutePath;
            startupPath = Uri.UnescapeDataString(startupPath);
            int index = startupPath.LastIndexOf("/");
            if (index > 0)
                startupPath = startupPath.Substring(0, index);

            Loggers.Default.Info(string.Concat("UploadDocumentOperation: Document save path: ", startupPath));
            string mode = "w";
            string tiffNameHash = jpegList[0].GetHashCode().ToString();
            string tiffFileName = "/tif" + tiffNameHash + ".tif";

            for (var jpegIndex = 0; jpegIndex < jpegList.Count; jpegIndex++)
            {
                using (Bitmap bimp = new Bitmap(jpegList[jpegIndex]))
                {
                    if (jpegIndex != 0)
                        mode = "a";

                    using (Tiff tifToAppend = Tiff.Open(startupPath + tiffFileName, mode))
                    {
                        tifToAppend.SetField(TiffTag.IMAGEWIDTH, bimp.Width);
                        tifToAppend.SetField(TiffTag.IMAGELENGTH, bimp.Height);
                        tifToAppend.SetField(TiffTag.BITSPERSAMPLE, 8);
                        tifToAppend.SetField(TiffTag.SAMPLESPERPIXEL, 3);
                        tifToAppend.SetField(TiffTag.ROWSPERSTRIP, bimp.Height);

                        tifToAppend.SetField(TiffTag.COMPRESSION, Compression.JPEG);
                        tifToAppend.SetField(TiffTag.PHOTOMETRIC, Photometric.RGB);
                        tifToAppend.SetField(TiffTag.FILLORDER, FillOrder.MSB2LSB);
                        tifToAppend.SetField(TiffTag.PLANARCONFIG, PlanarConfig.CONTIG);

                        byte[] buffer = GetImageRasterBytes(bimp, PixelFormat.Format24bppRgb);
                        int strideToAdd = buffer.Length / bimp.Height;
                        ConvertSamples(buffer, bimp.Width, bimp.Height);

                        for (int i = 0, offset = 0; i < bimp.Height; i++)
                        {
                            tifToAppend.WriteScanline(buffer, offset, i, 0);
                            offset += strideToAdd;
                        }
                    }
                }
            }

            byte[] tiffByteArray = File.ReadAllBytes(startupPath + tiffFileName);
            File.Delete(startupPath + tiffFileName);
            return tiffByteArray;
        }
        catch (Exception exception)
        {
            Loggers.Default.Error(exception.Message);
            return new byte[] { };
        }
    }

    Loggers.Default.Warn("ConvertToTiff: jpegList is empty");
    return new byte[] { };
}

public static byte[] GetImageRasterBytes(Bitmap bmp, PixelFormat format)
{
    Rectangle rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
    byte[] bits = null;

    try
    {
        // Lock the managed memory
        BitmapData bmpdata = bmp.LockBits(rect, ImageLockMode.ReadWrite, format);

        // Declare an array to hold the bytes of the bitmap.
        bits = new byte[bmpdata.Stride * bmpdata.Height];

        // Copy the values into the array.
        System.Runtime.InteropServices.Marshal.Copy(bmpdata.Scan0, bits, 0, bits.Length);
        
        // Release managed memory
        bmp.UnlockBits(bmpdata);
    }
    catch (Exception exception)
    {
        defaultLogger.Error(exception);
        return null;
    }

    return bits;
}

/// <summary> 
/// Converts BGR samples into RGB samples 
/// </summary> 
public static void ConvertSamples(byte[] data, int width, int height)
{
    int stride = data.Length / height;
    const int samplesPerPixel = 3;

    for (int y = 0; y < height; y++)
    {
        int offset = stride * y;
        int strideEnd = offset + width * samplesPerPixel;

        for (int i = offset; i < strideEnd; i += samplesPerPixel)
        {
            byte temp = data[i + 2];
            data[i + 2] = data[i];
            data[i] = temp;
        }
    }
}
